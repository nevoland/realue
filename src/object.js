import { compose, branch, withHandlers } from 'recompose'

import { hasProp, set } from './tools'

export const object = compose(
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeProperty: ({ value, name = value, onChange }) => (
        propertyValue,
        propertyName,
        event,
      ) => onChange(set(value, propertyName, propertyValue), name, event),
    }),
  ),
  withHandlers({
    property: ({ value, onChangeProperty: onChange }) => name => ({
      value: value[name],
      name,
      onChange,
    }),
  }),
)
