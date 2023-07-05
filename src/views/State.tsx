import { useState } from "../../lib/dependencies";

import { useObject, useArray, useArrayMutator } from "../../lib/main";
import { Checkbox } from "../components/Checkbox";

import type { ErrorReport, NevoProps } from "../../lib/types";

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
      {onRemove && (
        <button
          onClick={onRemove}
          class="bg-red-100 p-2 hover:bg-red-200 active:bg-red-900 active:text-white"
        >
          Remove
        </button>
      )}
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
        <Friend {...item(index)} onRemove={() => onChangeList(index)} />
      ))}
      <Friend
        key={`${item.parent.length}`}
        name={`${item.parent.length}`}
        onChange={(value: string) => onChangeList(item.parent.length, value)}
      />
    </div>
  );
}

type PersonProps = NevoProps<PersonData> & {
  onRemove(): void;
};

function Person({ onRemove, ...props }: PersonProps) {
  const property = useObject(props);
  const contactProperty = useObject(property("contact"));
  return (
    <div class="group/person flex flex-row space-x-2 p-2 even:bg-gray-200 hover:bg-gray-100 even:hover:bg-gray-300">
      <h3>Person</h3>
      <Input label="Name" {...property("name")} placeholder="Alice" />
      <Input label="Last name" {...property("lastName")} placeholder="Brown" />
      <InputNumber label="Age" {...property("age")} placeholder="23" />
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
      <button
        class="bg-red-100 p-2 hover:bg-red-200 active:bg-red-900 active:text-white"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
}

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
  const item = useArray({ value, onChange });
  const onChangeList = useArrayMutator({ value, onChange });
  return (
    <div class="m-3 flex flex-col space-y-2">
      {item.loop((index) => (
        <Person {...item(index)} onRemove={() => onChangeList(index)} />
      ))}
      <button
        class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white"
        onClick={() => onChangeList(value.length, {})}
      >
        Add person
      </button>
      <button
        class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white"
        onClick={() => {
          onChangeList(value.length, {});
          onChangeList(value.length, {});
          onChangeList(value.length, {});
        }}
      >
        Add three people
      </button>
      <pre class="bg-yellow-100 p-3">{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
}
