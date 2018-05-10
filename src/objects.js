import { reduce, join, pick } from 'lodash'
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

export const splittable = compose(
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeProperties: ({ value, name, onChange }) => (
        propertyValues,
        propertyNames,
        payload,
      ) =>
        onChange(
          reduce(
            propertyNames,
            (value, propertyName) =>
              setProperty(value, propertyName, propertyValues[propertyName]),
            value,
          ),
          name,
          payload,
        ),
    }),
  ),
  withHandlers({
    properties: ({ value, onChangeProperties: onChange }) => (
      names,
      key = join(names, '-'),
    ) => ({
      value: pick(value, names),
      key,
      name: names,
      onChange,
    }),
  }),
)
