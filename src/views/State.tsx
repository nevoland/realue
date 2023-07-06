import { memo, useCallback, useState } from "../../lib/dependencies";

import { useObject, useArray, useArrayMutator } from "../../lib/main";
import { Checkbox } from "../components/Checkbox";

import type { ErrorReport, Name, NevoProps } from "../../lib/types";

import { Input } from "../components/Input";
import { InputNumber } from "../components/InputNumber";

type PersonData = {
  name?: string;
  lastName?: string;
  age?: number;
  showContact?: boolean;
  contact?: {
    email?: string;
    phone?: string;
  };
  showFriends?: boolean;
  friends?: string[];
};

const e: ErrorReport<PersonData> = {
  value: [],
  property: {
    name: [],
    contact: {
      value: [],
      property: {
        email: [],
        phone: [],
      },
    },
  },
};

const e2: ErrorReport<PersonData[]> = {
  value: [],
  item: {
    0: {
      value: [],
      property: {},
    },
  },
};

console.log(e, e2);

type FriendProps = NevoProps<string> & { onRemove?(): void };

function Friend({ onRemove, ...props }: FriendProps) {
  return (
    <div class="flex flex-row" key={props.name}>
      <Input {...props} placeholder="Add friend" key={props.name} />
      {onRemove && <ButtonRemove onRemove={onRemove} />}
    </div>
  );
}

type FriendListProps = NevoProps<string[]>;

function FriendList(props: FriendListProps) {
  const item = useArray(props);
  const onChangeList = useArrayMutator(props);
  return (
    <div class="flex flex-col">
      {item.loop((index) => (
        <Friend
          {...item(index)}
          onRemove={onChangeList && (() => onChangeList(index))}
        />
      ))}
      <Friend
        key={`${item.parent.length}`}
        name={`${item.parent.length}`}
        onChange={
          onChangeList &&
          ((value: string) => onChangeList(item.parent.length, value))
        }
      />
    </div>
  );
}

function onValidateName(value: string) {
  const errorList = [];
  if (value.length <= 3) {
    errorList.push("The value must contain more than three characters.");
  }
  if (value[0] !== value[0]?.toUpperCase()) {
    errorList.push("It must start with a capital letter.");
  }
  if (errorList.length === 0) {
    return undefined;
  }
  return errorList;
}

type PersonProps = NevoProps<PersonData> & {
  onRemove(name: Name): void;
};

function ButtonRemove({ onRemove }: { onRemove(): void }) {
  return (
    <button
      class="bg-red-100 p-2 hover:bg-red-200 active:bg-red-900 active:text-white dark:bg-red-700 dark:hover:bg-red-800 dark:hover:active:bg-red-900"
      onClick={onRemove}
    >
      Remove
    </button>
  );
}

async function onValidateAge(value?: number) {
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

const Person = memo(({ onRemove: onRemoveItem, ...props }: PersonProps) => {
  const property = useObject(props);
  const contactProperty = useObject(property("contact"));
  const onRemove = useCallback(() => onRemoveItem(props.name), [onRemoveItem]);
  return (
    <div class="group/person flex flex-row space-x-2 p-2 even:bg-gray-200 hover:bg-gray-100 even:hover:bg-gray-300 dark:even:bg-gray-700 dark:hover:bg-gray-700 dark:even:hover:bg-gray-600">
      <h3>Person</h3>
      <Input
        label="Name"
        {...property("name")}
        placeholder="Alice"
        onValidate={onValidateName}
      />
      <Input
        label="Last name"
        {...property("lastName")}
        placeholder="Brown"
        onValidate={onValidateName}
      />
      <InputNumber
        label="Age"
        {...property("age")}
        placeholder="23"
        onValidate={onValidateAge}
      />
      <div class="flex flex-col">
        <Checkbox label="Show contact" {...property("showContact")} />
        {property.parent?.showContact && (
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
        <Checkbox label="Show friends" {...property("showFriends")} />
        {property.parent?.showFriends && (
          <div class="flex flex-row space-x-2">
            <FriendList {...property("friends")} />
          </div>
        )}
      </div>
      <div class="flex-grow"></div>
      <ButtonRemove onRemove={onRemove} />
    </div>
  );
});

// export function State() {
//   const [state, onChangeState] = useState<Data>({});
//   const property = useObject(state, onChangeState);
//   return (
//     <div class="m-3 flex flex-col space-y-2">
//       <Person {...property("person1")} />
//       <Person {...property("person2")} />
//       <pre class="bg-yellow-100 p-3">{JSON.stringify(state, null, 2)}</pre>
//     </div>
//   );
// }

export function State() {
  const [value, onChange] = useState<PersonData[]>([
    { friends: ["Bob", "Alice"] },
    {},
    {},
  ]);
  const [error, onChangeError] = useState<ErrorReport<PersonData[]>>();
  const props = { value, onChange, name: "", error, onChangeError };
  const item = useArray(props);
  const onChangeArray = useArrayMutator(props);
  const onRemoveItem = useCallback(
    (itemName: Name) => onChangeArray?.(+itemName),
    [onChangeArray],
  );
  const onAppendItem = useCallback(
    () => onChangeArray?.(item.parent.length, {}),
    [onChangeArray],
  );
  const onAppendThreeItems = useCallback(() => {
    onAppendItem();
    onAppendItem();
    onAppendItem();
  }, [onAppendItem]);
  return (
    <div class="m-3 flex flex-col space-y-2">
      {item.loop((index) => (
        <Person {...item(index)} onRemove={onRemoveItem} />
      ))}
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
        <pre class="flex-grow bg-yellow-100 p-3 dark:bg-sky-900">
          {JSON.stringify(value, null, 2)}
        </pre>
        <pre class="flex-grow bg-yellow-100 p-3 dark:bg-red-800">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    </div>
  );
}
