import { compose, branch, withHandlers } from 'recompose'

import { hasProp, setProperty } from './tools'

export const object = compose(
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeProperty: ({ value, name, onChange }) => (
        propertyValue,
        propertyName,
        payload,
      ) =>
        onChange(
          setProperty(value, propertyName, propertyValue),
          name,
          payload,
        ),
    }),
  ),
  withHandlers({
    property: ({ value, onChangeProperty: onChange }) => (name, key) => ({
      value: value[name],
      key,
      name,
      onChange,
    }),
  }),
)
