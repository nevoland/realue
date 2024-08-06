import { memo, useCallback, useId } from "../../lib/dependencies.js";
import { type NevoProps, useInput } from "../../lib/main.js";

type CheckboxProps = NevoProps<boolean | undefined> & {
  label?: string;
};

export const Checkbox = memo(function Checkbox(props: CheckboxProps) {
  const { value = false, name, label } = props;
  const onInput = useInput(
    props,
    useCallback(() => !value, [value]),
  );
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
