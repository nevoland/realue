import {
  compose,
  branch,
  withHandlers,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { without } from 'lodash'

import { replace, insert, hasProp } from './tools'

export const array = branch(
  hasProp('onChange'),
  compose(
    withHandlers({
      onChangeItem: ({ value, onChange }) => (item, name, payload) =>
        onChange(
          item === undefined
            ? without(value, name)
            : replace(value, name, item),
          value,
          payload,
        ),
      onAdd: ({ value, onChange }) => (item, _, payload) =>
        onChange(
          insert(
            value,
            item,
            payload == null || payload.index == null
              ? value.length
              : payload.index,
          ),
          value,
          payload,
        ),
    }),
    withPropsOnChange(['onChangeItem'], ({ onChangeItem: onChange }) => ({
      item: (value, key = value) => ({ key, value, onChange }),
    })),
  ),
  withProps({
    item: (value, key = value) => ({ value, key }),
  }),
)

export const removable = branch(
  hasProp('onChange'),
  withHandlers({
    remove: ({ value, name = value, onChange }) => payload =>
      onChange(undefined, name, payload),
  }),
)
