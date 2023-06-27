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
  contact: {
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
  // Handle calculations
  return (
    <div class="group/person flex flex-row space-x-2 p-2 even:bg-gray-200 hover:bg-gray-100 even:hover:bg-gray-300">
      <h3>Person</h3>
      <Input label="Name" placeholder="Alice" />
      <Input label="Last name" placeholder="Brown" />
      <InputNumber label="Age" placeholder="23" />
      <div class="flex flex-col">
        <Checkbox label="Show contact" />
        <div class="flex flex-row space-x-2">
          <Input label="Email" placeholder="user@company.com" />
          <Input label="Phone" placeholder="123-456-789" />
        </div>
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

export function State() {
  const [state, onChangeState] = useState<PersonData[]>([{}, {}, {}]);
  // Handle calculations
  return (
    <div class="m-3 flex flex-col space-y-2">
      {state.map((_, index) => (
        <Person />
      ))}
      <button class="bg-green-300 p-2 hover:bg-green-400 active:bg-green-800 active:text-white">
        Add person
      </button>
      <pre class="bg-yellow-100 p-3">{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}
