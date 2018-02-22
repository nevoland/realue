import { compose, branch, withHandlers } from 'recompose'

import { setItem, insertItem, hasProp } from './tools'

export const array = compose(
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
