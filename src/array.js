import {
  compose,
  branch,
  withHandlers,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { slice, indexOf, without } from 'lodash'

export function replace(array, previousValue, value) {
  return replaceAt(array, indexOf(array, previousValue), value)
}

export function replaceAt(array, index, value) {
  return index === -1
    ? array
    : [...slice(array, 0, index), value, ...slice(array, index + 1)]
}

const hasOnChange = ({ onChange }) => onChange != null

export function array(Component) {
  return compose(
    branch(
      hasOnChange,
      compose(
        withHandlers({
          onChangeItem: ({ value, onChange }) => (item, id, event) =>
            onChange(replace(value, id, item), value, event),
          onRemoveItem: ({ value, onChange }) => (item, event) =>
            onChange(without(value, item), value, event),
        }),
        withPropsOnChange(
          ['onChangeItem', 'onRemoveItem'],
          ({ onChangeItem: onChange, onRemoveItem: onRemove }) => ({
            item: (value, key = value) => ({ value, key, onChange, onRemove }),
          }),
        ),
      ),
      withProps({
        item: (value, key = value) => ({ value, key }),
      }),
    ),
  )(Component)
}
