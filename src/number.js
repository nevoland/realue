import { branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const number = branch(
  hasProp('onChange'),
  withHandlers({
    onChange: ({ name, onChange }) => event => {
      const { valueAsNumber, value } = event.target
      if (valueAsNumber == null || isNaN(valueAsNumber)) {
        const parsedValue = parseFloat(value)
        return onChange(isNaN(parsedValue) ? value : parsedValue, name, event)
      }
      return onChange(valueAsNumber, name, event)
    },
  }),
)
