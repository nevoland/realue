import { useCallback, useState, type JSX } from "../../lib/dependencies";

import { useObject, useArray, useArrayMutator } from "../../lib/main";
import { adapt } from "../../lib/tools/adapt";
import { Checkbox } from "../components/Checkbox";

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
};

type PersonGroupData = {
  person1?: PersonData;
  person2?: PersonData;
};

type PersonProps = {
  value?: PersonData;
  onChange(value: PersonData): void;
  onRemove(): void;
};

function Person({ value, onChange, onRemove }: PersonProps) {
  const property = useObject(value, onChange);
  const contactProperty = useObject(...adapt(property("contact")));

  return (
    <div class="group/person flex flex-row space-x-2 p-2 even:bg-gray-200 hover:bg-gray-100 even:hover:bg-gray-300">
      <h3>Person</h3>
      <Input label="Name" {...property("name")} placeholder="Alice" />
      <Input label="Last name" {...property("lastName")} placeholder="Brown" />
      <InputNumber label="Age" {...property("age")} placeholder="23" />
      <div class="flex flex-col">
        <Checkbox label="Show contact" {...property("showContact")} />
        {value?.showContact && (
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
  const [value, onChange] = useState<PersonData[]>([{}, {}, {}]);
  const item = useArray(value, onChange);
  const onChangeList = useArrayMutator(value, onChange);
  return (
    <div class="m-3 flex flex-col space-y-2">
      {value.map((_, index) => (
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
