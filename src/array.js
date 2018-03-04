import { compose, branch, withHandlers, withProps } from 'recompose'

import { setItem, insertItem, hasProp, EMPTY_ARRAY } from './tools'

export const array = compose(
  branch(({ value }) => value == null, withProps({ value: EMPTY_ARRAY })),
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeItem: ({ value, name, onChange }) => (item, index, payload) =>
        onChange(setItem(value, index, item), name, payload),
      onAdd: ({ value, name, onChange }) => (item, index, payload) =>
        onChange(insertItem(value, item, index), name, payload),
    }),
  ),
  withHandlers({
    item: ({ onChangeItem: onChange, value }) => (name, key = name) => ({
      key,
      value: value[name],
      name,
      onChange,
    }),
  }),
)

export const removable = branch(
  hasProp('onChange'),
  withHandlers({
    remove: ({ name, onChange }) => payload =>
      onChange(undefined, name, payload),
  }),
)
