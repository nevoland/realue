import { memo, useId } from "../../lib/dependencies.js";
import { type NevoProps, useChange } from "../../lib/main.js";

type CheckboxProps = NevoProps<boolean | undefined> & {
  label?: string;
};

function transformValue(value?: boolean) {
  return !value;
}

export const Checkbox = memo(function Checkbox(props: CheckboxProps) {
  const onInput = useChange(props, transformValue);
  const { value = false, name, label } = props;
  const id = useId();
  return (
    <div class="flex flex-row items-center space-x-1">
      <input
        checked={value}
        id={id}
        name={name}
        onChange={onInput}
        type="checkbox"
      />
      <label for={id}>{label}</label>
    </div>
  );
});
