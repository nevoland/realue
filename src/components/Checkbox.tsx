import { memo, useId } from "../../lib/dependencies";
import { type NevoProps, useChange } from "../../lib/main";

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
        id={id}
        type="checkbox"
        checked={value}
        onChange={onInput}
        name={name}
      />
      <label for={id}>{label}</label>
    </div>
  );
});
