import { compose, branch, withHandlers } from 'recompose'
import { omit } from 'lodash'

function set(object, key, value) {
  /*
  Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
  Note that if `value` is `undefined`, any value stored at `object[key]` is removed.
  */
  return object == null
    ? value === undefined ? {} : { [key]: value }
    : value === undefined
      ? !(key in object) ? object : omit(object, key)
      : object[key] === value ? object : { ...object, [key]: value }
}

const hasOnChange = ({ onChange }) => onChange != null

export function object(Component) {
  return compose(
    branch(
      hasOnChange,
      compose(
        withHandlers({
          onChangeProperty: ({ value, name: id = value, onChange }) => (
            property,
            name,
            event,
          ) => onChange(set(value, name, property), id, event),
        }),
        withHandlers({
          property: ({ value, onChangeProperty: onChange }) => name => ({
            value: value[name],
            name,
            onChange,
          }),
        }),
      ),
      withHandlers({
        property: ({ value }) => name => ({
          value: value[name],
          name,
        }),
      }),
    ),
  )(Component)
}
