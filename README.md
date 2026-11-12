# Realue

⚛️ Simple value management for React components.

Realue is a set of hooks for building forms and other interfaces that edit structured data. Its purpose is to remove the glue code between components: the code that takes a value apart to hand each piece to a child component, puts it back together when a child changes its piece, and does the same for validation errors.

It does so with a single convention, the **NEVO pattern**: every component that handles a value receives it through the same five props. Since all components share this contract, generic hooks can do the wiring between them. These hooks cover objects and arrays of any depth, validation errors, delayed changes, value conversions, and asynchronous loading and saving.

## The NEVO pattern

A component follows the NEVO pattern when it handles one value and receives everything about it through these five props:

| Prop | Purpose |
| --- | --- |
| `name` | Identifies the value for the parent component: the property name if the parent handles an object, the item index if it handles an array. |
| `error` | The errors found in the value, if any (see [Error handling](#error-handling)). |
| `value` | The value to handle. |
| `onChange(value, name)` | Called by the component to change the value. If it is not set, the value is read-only. |
| `onChangeError(error, name)` | Called by the component to change the error, for instance after validating the value. |

NEVO stands for **n**ame, **e**rror, **v**alue, and **o**nChange. Only `value` is required, and a component can take any other props next to these five. The [`NevoProps<T>`](doc/type-aliases/NevoProps.md) type describes them for a value of type `T`, and is all that a component needs from the library to follow the pattern:

```tsx
import type { NevoProps } from "realue";

function Checkbox({ name, value, onChange }: NevoProps<boolean | undefined>) {
  return (
    <input
      type="checkbox"
      name={name}
      checked={value}
      disabled={onChange === undefined}
      onChange={onChange && (() => onChange(!value, name))}
    />
  );
}
```

This component applies the two rules that the hooks rely on: it hands its `name` back along with the new value, and it is read-only when `onChange` is not set.

### What it replaces

Take a component that edits a user. Without a common contract, it has to hand each field its part of the value and of the error, and to create the callbacks that merge the changes back:

```tsx
function User({ value, error, onChange, onChangeError }: UserProps) {
  return (
    <>
      <Input
        label="Name"
        value={value.name}
        error={error?.name}
        onChange={(name) => onChange({ ...value, name })}
        onChangeError={(nameError) =>
          onChangeError({ ...error, name: nameError })
        }
      />
      <InputNumber
        label="Level"
        value={value.level}
        error={error?.level}
        onChange={(level) => onChange({ ...value, level })}
        onChangeError={(levelError) =>
          onChangeError({ ...error, level: levelError })
        }
      />
    </>
  );
}
```

This glue code grows with every field. It also creates new callbacks at each render, which defeats the memoization of the inputs, and it is still incomplete: the error object is never emptied when an error goes away.

When `Input` and `InputNumber` follow the NEVO pattern, [`useObject`](doc/functions/useObject.md) produces these props instead:

```tsx
function User(props: NevoProps<UserType>) {
  const property = useObject(props);
  return (
    <>
      <Input label="Name" {...property("name")} />
      <InputNumber label="Level" {...property("level")} />
    </>
  );
}
```

`property("name")` returns the `name`, `error`, `value`, `onChange`, and `onChangeError` props for the name of the user, ready to be spread on any component that handles a string. [`useArray`](doc/functions/useArray.md) does the same for the items of an array, and also takes care of their keys, of inserting and removing items, and of keeping the errors aligned with the items when their indices shift.

### What the contract enables

- **Components fit together without adapters.** A text input handles a string, a user form handles a user, a user list handles an array of users. All three receive the same five props; only the type of `value` differs. A component does not depend on where its value comes from, so it fits wherever a value of its type is found: at the root of the application, in the property of an object, or in the item of an array.
- **One callback serves all the children.** A component passes its `name` back as the second argument of `onChange` and `onChangeError`. A parent can thus give the very same callback to all its children and still know which one changed. This is how `useObject` and `useArray` work: instead of one callback per child, they create a single one and keep it from one render to the next, so that memoized children only render again when their own `value` or `error` changes.
- **Errors follow the same path as values.** The `error` of an object or an array mirrors the structure of its value. The same hooks thus hand each child the errors that concern it, and merge the errors that a child reports through `onChangeError` back into those of its parent. An error set at the top, such as a response from a server, and an error set at the bottom, such as the validation of a field, end up in the same place.
- **Read-only state carries down.** When `onChange` is not set, `useObject` and `useArray` do not set it for the children either. Leaving this one prop out at the top makes an entire form read-only.
- **Hooks combine.** The props returned by a hook are NEVO props again, which can be spread on a component or passed to another hook. A nested object only takes another `useObject`, and the hooks that change a behavior apply to a single field as well as to an entire form: `useDelay` delays the changes, `useTransform` converts the value, `useValidator` validates it, and `useAsyncProps` loads and saves it.

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/realue):

```bash
npm install realue
```

## Usage

Everything is exported from the main entry-point through an ES6 module.

### Quick start

The following example edits a list of users with three hooks:

- [`useSyncedProps`](doc/functions/useSyncedProps.md) holds the list and its errors in a local state, and returns them as NEVO props.
- [`useArray`](doc/functions/useArray.md) returns the props of each user. Its `loop` method renders a component for each of them, while `add` and `remove` insert and remove users.
- [`useObject`](doc/functions/useObject.md) returns the props of each property of a user.

```tsx
import { useArray, useObject, useSyncedProps } from "realue";
import type { ErrorReport, ItemRemover, NevoProps } from "realue";

type UserType = {
  name?: string;
  level?: number;
};

function User(props: NevoProps<UserType> & { onRemove?: ItemRemover }) {
  const property = useObject(props);
  return (
    <>
      <Input label="Name" {...property("name")} />
      <InputNumber label="Level" {...property("level")} />
      <button
        disabled={props.onRemove === undefined}
        onClick={() => props.onRemove?.(+props.name!)}
      >
        Delete user
      </button>
    </>
  );
}

function UserList(props: NevoProps<UserType[]>) {
  const item = useArray(props);
  return (
    <>
      {item.loop(User, { onRemove: item.remove })}
      <button onClick={item.add && (() => item.add({}))}>Add user</button>
    </>
  );
}

const USER_LIST: UserType[] = [
  { name: "Alice", level: 5 },
  { name: "Bob", level: -2 },
];

const USER_LIST_ERROR: ErrorReport<UserType[]> | undefined = undefined;

export default function App() {
  const props = useSyncedProps({
    name: "userList",
    error: USER_LIST_ERROR,
    value: USER_LIST,
  });
  return (
    <>
      <h1>Users</h1>
      <UserList {...props} />
    </>
  );
}
```

<details>
  <summary>The <code>Input</code> and <code>InputNumber</code> components used in the example</summary>

```tsx
import { memo } from "preact/compat";
import { useDelay, useInput } from "realue";
import type { NevoProps } from "realue";

function extractInputValue<T extends string | undefined>({
  value,
}: HTMLInputElement) {
  return (value === "" ? undefined : value) as T;
}

type InputProps = NevoProps<string | undefined> & {
  label?: string;
  placeholder?: string;
  delay?: number;
};

export const Input = memo(function Input({
  label,
  placeholder,
  delay,
  ...props
}: InputProps) {
  const { error } = props;
  const inputProps = useDelay(props, delay);
  const { value = "", name } = inputProps;
  const onInput = useInput(inputProps, extractInputValue);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        autoComplete="new-password"
        disabled={onInput === undefined}
        name={name}
        onInput={onInput}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
});

type InputNumberProps = NevoProps<number | undefined> & {
  label?: string;
  placeholder?: string;
};

function extractInputNumberValue({ value }: HTMLInputElement) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? undefined : parsedValue;
}

export const InputNumber = memo(function InputNumber(props: InputNumberProps) {
  const {
    value: currentValue,
    name,
    onChange,
    label,
    placeholder,
    error,
  } = props;
  const value =
    currentValue === undefined
      ? undefined
      : isNaN(currentValue)
        ? 0
        : currentValue;
  const onInput = useInput(props, extractInputNumberValue);
  return (
    <div class="flex flex-col space-y-1">
      <label>{label}</label>
      {error && <p class="text-red-500 dark:text-red-300">{error.join(" ")}</p>}
      <input
        autoComplete="off"
        disabled={!onChange}
        name={name}
        onInput={onChange ? onInput : undefined}
        placeholder={placeholder}
        type="number"
        value={value === undefined ? "" : value}
      />
    </div>
  );
});
```

</details>

The components only state which part of the value goes to which component. Reading the properties, copying the objects, and rebuilding the array at each change is left to the hooks, and the state takes the shape of the component structure.

### Error handling

Errors are passed down like values. Setting `USER_LIST_ERROR` to the following value in the example above displays an error message for the level of Bob, without any change to the components:

```tsx
const USER_LIST_ERROR: ErrorReport<UserType[]> | undefined = {
  1: { level: ["The level must be a positive number."] },
};
```

The `error` follows a [simple structure](doc/type-aliases/ErrorReport.md) that mirrors the one of the value:

- For a [primitive value](doc/type-aliases/ErrorReportValue.md) (a `boolean`, a `number`, or a `string`), it is a list of one or several messages: `["This is not an email address."]`.
- For an [object](doc/type-aliases/ErrorReportObject.md), it maps property names to error reports: `{ name: ["The name is missing."] }`. Errors that pertain to the entire object are stored at the empty string key if some properties have errors as well, as in `{ "": ["Either the username or the email address must be set."], level: ["The level must be positive."] }`, or directly as a list of messages otherwise.
- For an [array](doc/type-aliases/ErrorReportArray.md), it maps item indices to error reports: `{ 1: { name: ["The name is required and cannot be empty."] } }`. Errors that pertain to the entire array are stored the same way as for objects.

Errors can also be set by the components, through `onChangeError`. For instance, [`useValidator`](doc/functions/useValidator.md) validates a value each time it changes and reports the result. Adding it to the `User` component of the example produces the error above from the value itself:

```tsx
function onValidateLevel(level?: number) {
  return level !== undefined && level < 0
    ? ["The level must be a positive number."]
    : undefined;
}

function User(props: NevoProps<UserType> & { onRemove?: ItemRemover }) {
  const property = useObject(props);
  useValidator(property("level"), onValidateLevel);
  // …
}
```

The error goes up to `App` through `onChangeError`, merged by `useObject` and `useArray` into `{ 1: { level: […] } }` on the way, and comes back down as the `error` of the level input of Bob.

### Hooks and tools

The hooks take NEVO props, return NEVO props, or both, which is what lets them combine. For instance, a nested object does not need a component of its own: the props of the property that holds it can be passed to another `useObject`.

```tsx
type UserType = {
  name?: string;
  contact?: { email?: string; phone?: string };
};

function User(props: NevoProps<UserType>) {
  const property = useObject(props);
  const contact = useObject(property("contact"));
  return (
    <>
      <Input label="Name" {...property("name")} />
      <Input label="Email" {...contact("email")} />
      <Input label="Phone" {...contact("phone")} />
    </>
  );
}
```

| Purpose | Hook or tool | Description |
| --- | --- | --- |
| Hold the state | [`useSyncedProps`](doc/functions/useSyncedProps.md) | Holds the `value` and the `error` in a local state, synced with the props of the parent, if any. |
| | [`useAsyncProps`](doc/functions/useAsyncProps.md) | Loads the `value` and saves its changes through an asynchronous `handle(query)` function, sets the `error` when it fails, and returns the `status` of the ongoing task. |
| Split a value | [`useObject`](doc/functions/useObject.md) | Returns the props of each property of an object. |
| | [`useArray`](doc/functions/useArray.md) | Returns the props of each item of an array, with the methods to render, add, and remove items. |
| Change a behavior | [`useDelay`](doc/functions/useDelay.md) | Debounces or throttles the calls to `onChange` while updating the `value` immediately. |
| | [`useTransform`](doc/functions/useTransform.md) | Converts the `value` on its way down and back up, and optionally the `error`. |
| | [`useValidator`](doc/functions/useValidator.md) | Validates the `value` each time it changes, synchronously or not, and reports the result through `onChangeError`. |
| Connect elements and other components | [`useInput`](doc/functions/useInput.md) | Returns an event listener that passes the value of an input element to `onChange`. |
| | [`useMutator`](doc/functions/useMutator.md) | Returns a mutator that only takes the new value, for components that do not hand the `name` back. |
| | [`useOption`](doc/functions/useOption.md) | Renames `value` and `onChange` after an option name, e.g., `open` and `onChangeOpen`. |
| | [`adapt`](doc/functions/adapt.md), [`normalize`](doc/functions/normalize.md) | Rename the five props after a property name, and back, to give a second value to a component. |
| | [`disable`](doc/functions/disable.md) | Returns the props that make a component read-only if a condition is met or a promise is pending. |
| Handle errors | [`globalError`](doc/functions/globalError.md), [`childrenError`](doc/functions/childrenError.md) | Return the errors of the entire value, or the ones of its properties or items. |
| | [`changeError`](doc/functions/changeError.md), [`normalizeError`](doc/functions/normalizeError.md), [`isEqualError`](doc/functions/isEqualError.md) | Update, clean up, and compare error reports. |

The library also provides general-purpose hooks that do not depend on the pattern, to track promises (`usePromise`, `useAsyncCallback`, `useAbortController`), delay or retain values (`useDefer`, `useResilient`, `usePrevious`), handle references (`useSyncedRef`, `useRefList`), and debug renders (`useLog`).

## Documentation

Check out the [API documentation](doc/README.md) for the complete list of hooks, tools, and types.

## Demo

A demo application can be run in the browser with:

```bash
npm run dev
open http://localhost:5000
```

You can then inspect and edit the code in the `src/` folder.
