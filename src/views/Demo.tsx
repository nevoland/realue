import {
  adapt,
  normalize,
  useArray,
  useObject,
  useRemove,
  useValidator,
} from "../../lib/main.js";
import type {
  ErrorReport,
  NevoProps,
  ValueRemover,
  ValueValidator,
} from "../../lib/types";
import { Checkbox } from "../components/Checkbox.jsx";
import { Input } from "../components/Input.jsx";
import { InputNumber } from "../components/InputNumber.jsx";
import { memo, sleep, uid, useCallback, useState } from "../dependencies.js";

const result = adapt("option", { name: "test", value: 1 });
const resultNormalized = normalize("option", result);
resultNormalized.value;

type PersonData = {
  id: string;
  name?: string;
  lastName?: string;
  userName?: string;
  age?: number;
  activeSince?: number;
  showContact?: boolean;
  contact?: {
    email?: string;
    phone?: string;
  };
  showFriends?: boolean;
  friends?: (string | undefined)[];
};

type FriendProps<N extends string> = NevoProps<string | undefined, N> & {
  onRemove?: ValueRemover;
};

function Friend<N extends string>(props: FriendProps<N>) {
  const onRemove = useRemove(props);
  return (
    <div class="flex flex-row" key={props.name}>
      <Input {...props} key={props.name} placeholder="Add friend" />
      {onRemove && <ButtonRemove onRemove={onRemove} />}
    </div>
  );
}

type FriendListProps = NevoProps<(string | undefined)[] | undefined>;

const FriendList = memo((props: FriendListProps) => {
  const item = useArray(props);
  const { length: lastIndex } = props.value ?? [];
  return (
    <div class="flex flex-col">
      {item.loop((props) => (
        <Friend {...props} onRemove={item.remove} />
      ))}
      <Friend
        key={`${lastIndex}`}
        name={`${lastIndex}`}
        onChange={item.add}
        value={undefined}
      />
    </div>
  );
});

async function onValidateName(value?: string) {
  const errorList: string[] = [];
  if (!value) {
    return undefined;
  }
  if (value.length <= 3) {
    errorList.push("The value must contain more than three characters.");
  }
  if (value[0] !== value[0]?.toUpperCase()) {
    errorList.push("It must start with a capital letter.");
  }
  await sleep(2000);
  if (errorList.length === 0) {
    return undefined;
  }
  return errorList;
}

function ButtonRemove({ onRemove }: { onRemove?(): void }) {
  return (
    <button
      class="bg-red-100 p-2 hover:bg-red-200 active:bg-red-900 active:text-white dark:bg-red-700 dark:hover:bg-red-800 dark:hover:active:bg-red-900"
      disabled={onRemove === undefined}
      onClick={onRemove}
    >
      Remove
    </button>
  );
}

function onValidateAge(value?: number) {
  if (value === undefined) {
    return undefined;
  }
  if (value < 0) {
    return ["Age cannot be negative."];
  }
  if (value <= 2) {
    return ["Age must be higher than 2."];
  }
  return undefined;
}

const onValidatePerson: ValueValidator<PersonData> = (value) => {
  const errorList: string[] = [];
  if (value?.lastName == null || value?.age == null) {
    errorList.push("The last name and the age must be set.");
  }
  if (
    value?.activeSince !== undefined &&
    value?.age !== undefined &&
    value.age < value.activeSince
  ) {
    errorList.push("The number of active years cannot be longer than the age.");
  }
  return errorList.length > 0 ? errorList : undefined;
};

async function onValidateUsername(value?: string) {
  if (!value) {
    return;
  }
  const result = await fetch(
    `https://api.github.com/users/${encodeURIComponent(value)}`,
  );
  if (result.status !== 200) {
    return ["User does not exist."];
  }
  return undefined;
}

type PersonProps = NevoProps<PersonData> & {
  onRemove?: ValueRemover;
};

const Person = memo((props: PersonProps) => {
  const property = useObject(props);
  const contactProperty = useObject(property("contact"));
  const onRemove = useRemove(props);
  useValidator(property(), onValidatePerson);
  return (
    <div class="group/person flex flex-col space-y-2 p-2 even:bg-gray-200 hover:bg-gray-100 even:hover:bg-gray-300 dark:even:bg-gray-700 dark:hover:bg-gray-700 dark:even:hover:bg-gray-600">
      <div class="flex flex-row space-x-2">
        <h3>Person</h3>
        <p class="text-red-500 dark:text-red-300">
          {props.error?.[""]?.join(" ")}
        </p>
      </div>
      <div class="flex flex-row space-x-2">
        <Input
          label="Name"
          {...property("name")}
          onValidate={onValidateName}
          placeholder="Alice"
        />
        <Input
          label="Last name"
          onValidate={onValidateName}
          placeholder="Brown"
          {...property("lastName")}
          // delay={300}
        />
        <Input
          label="Username"
          onValidate={onValidateUsername}
          placeholder="abrown"
          {...property("userName")}
          // delay={300}
        />
        <InputNumber
          label="Age"
          {...property("age")}
          onValidate={onValidateAge}
          placeholder="23"
        />
        <InputNumber
          label="Years active"
          {...property("activeSince")}
          onValidate={onValidateAge}
          placeholder="1"
        />
        <div class="flex flex-col">
          <Checkbox label="Show contact" {...property("showContact")} />
          {props.value?.showContact && (
            <div class="flex flex-row space-x-2">
              <Input
                label="Email"
                {...contactProperty("email")}
                placeholder="user@company.com"
              />
              <Input
                label="Phone"
                {...contactProperty("phone")}
                placeholder="123-456-789"
              />
            </div>
          )}
        </div>
        <div class="flex flex-col">
          <Checkbox
            label={`Show friends (${props.value?.friends?.length ?? 0})`}
            {...property("showFriends")}
          />
          {props.value?.showFriends && (
            <div class="flex flex-row space-x-2">
              <FriendList {...property("friends")} />
            </div>
          )}
        </div>
        <div class="grow" />
        <ButtonRemove onRemove={onRemove} />
      </div>
    </div>
  );
});

export function Demo() {
  const [value, onChange] = useState<PersonData[]>([
    { friends: ["Bob", "Alice"], id: uid() },
    { id: uid() },
  ]);
  const [error, onChangeError] = useState<
    ErrorReport<PersonData[]> | undefined
  >();
  const props = { error, name: "", onChange, onChangeError, value };
  // logProps("State", { value, error });
  const item = useArray(props, (_, item) => item.id);
  // const onRemoveItem = useCallback(
  //   (itemName: Name) => item.remove(+itemName),
  //   [item.remove],
  // );
  const onAppendItem = useCallback(() => item.add?.({ id: uid() }), [item]);
  const onPrependItem = useCallback(() => item.add?.({ id: uid() }, 0), [item]);
  const onAppendThreeItems = useCallback(() => {
    onAppendItem();
    onAppendItem();
    onAppendItem();
  }, [onAppendItem]);
  return (
    <div class="m-3 flex flex-col space-y-2">
      {item.loop(Person, { onRemove: item.remove })}
      <button
        class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900"
        onClick={onPrependItem}
      >
        Add person at the begining
      </button>
      <button
        class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900"
        onClick={onAppendItem}
      >
        Add person
      </button>
      <button
        class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white dark:bg-green-700 dark:hover:bg-green-800 dark:active:bg-green-900"
        onClick={onAppendThreeItems}
      >
        Add three people
      </button>
      <div class="w[100%] flex flex-row">
        <pre class="basis-1/2 bg-yellow-100 p-3 dark:bg-sky-900">
          {JSON.stringify(value, formatJson, 2)}
        </pre>
        <pre class="basis-1/2 bg-red-100 p-3 dark:bg-red-800">
          {JSON.stringify(error, formatJson, 2)}
        </pre>
      </div>
    </div>
  );
}

function formatJson(_key: any, value: any) {
  if (value === undefined) {
    return null;
  }
  return value;
}
