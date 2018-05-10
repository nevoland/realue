import { compose, branch, withHandlers, withProps } from 'recompose'

import { hasProp, hasNotProp, setProperty, EMPTY_OBJECT } from './tools'

export const object = compose(
  branch(hasNotProp('value'), withProps({ value: EMPTY_OBJECT })),
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
    property: ({ value, onChangeProperty: onChange }) => (
      name,
      key = name,
    ) => ({
      value: value[name],
      key,
      name,
      onChange,
    }),
  }),
)
