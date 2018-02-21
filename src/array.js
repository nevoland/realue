import { compose, branch, withHandlers } from 'recompose'

import { setItem, insertItem, hasProp } from './tools'

export const array = compose(
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeItem: ({ value, onChange }) => (item, name, payload) =>
        onChange(setItem(value, name, item), value, payload),
      onAdd: ({ value, onChange }) => (item, name, payload) =>
        onChange(insertItem(value, item, name), value, payload),
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
