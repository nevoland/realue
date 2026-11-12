# Realue

⚛️ Simple value management for React components.

### Features

- Enforces reusable components based on the `{ name, error, value, onChange(value, name), onChangeError(error, name) }` properties, also called the "NEVO" pattern.
- Provides helpers for effortlessly handling complex structured value types (arrays and objects, aka lists and maps) and their potential errors.
- Considerably reduces boilerplate code by handling the application state directly in components, and shaping it through the component structure.
- Brings efficient asynchronous handlers for sending data to persistence systems.

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/realue):

```bash
npm install realue
```

## Usage

Everything is exported from the main entry-point through an ES6 module.

### Quick start

Use `useObject` to automatically handle an object property, or `useArray` for handling array items. Note how all the values are handled gracefully, without having to write boilerplate code.

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
  <summary>Library components used in the example</summary>

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
  const inputProps = useDelay(props, delay);
  const { value = "", name, error } = inputProps;
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

### Error handling

Changing the `USER_LIST_ERROR` in the example above to the following value, will automatically add an error message for Bob's level value. These errors can be either passed down to components through the `error` prop, but also communicated back up through the `onChangeError` property.

```tsx
const USER_LIST_ERROR: ErrorReport<UserType[]> | undefined = {
  1: { level: ["The level must be a positive number."] },
};
```

The `error` value follows a [simple structure](doc/type-aliases/ErrorReport.md) to map error messages to specific values:

- An error report for a [primitive value](doc/type-aliases/ErrorReportValue.md) (e.g., a `boolean`, `number`, or `string` value) consists of a list of one or several strings (e.g., `["This is not an email address."]`).
- Error reports for [objects](doc/type-aliases/ErrorReportObject.md) consist of a mapping of property names to error reports (e.g. `{ name: ["The name is missing."] }`). In case of an error that pertains to the entire value, it can either be stored at the empty string key in case that there are also errors for specific properties (e.g., `{ "": ["Either the username or the email address must be set."], "level": ["The level must be positive."] }`), or directly as a list of strings: `["Either the username or the email address must be set."]`.
- Error reports for [arrays](doc/type-aliases/ErrorReportArray.md) are similar to those for objects, except that they map item indices to error reports (e.g., `{ 1: { "name": ["The name is required and cannot be empty."] } }`). As well as in error reports for objects, an error report for the entire array could be set at the empty string key if there are errors for the array items, or directly as a list of strings.

### Property name conventions

Components handle a value and render it. That value is received through the `value` property.

It also gets an optional error report that can be provided through the `error` property.

Any callback name starts with the `"on"` prefix: `onChange` is used to report a `value` change, `onChangeError` serves to update the `error`.

## Documentation

Checkout the [API documentation](doc/README.md).

## Demo

A demo application can be run in the browser with:

```bash
npm run dev
open http://localhost:5000
```

You can then inspect and edit the code in the `src/` folder.
