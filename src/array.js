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
        onChange(replace(value, name, item), value, payload),
      onRemoveItem: ({ value, onChange }) => (item, payload) =>
        onChange(without(value, item), value, payload),
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
)
