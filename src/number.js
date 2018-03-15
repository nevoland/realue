import { compose, branch, withHandlers, withProps } from 'recompose'

import { hasProp } from './tools'

export const number = compose(
  branch(({ value }) => value == null, withProps({ value: 0 })),
  branch(
    hasProp('onChange'),
    withHandlers({
      onChange: ({ name, onChange }) => event => {
        const { valueAsNumber, value } = event.target
        const parsedValue =
          valueAsNumber == null || isNaN(valueAsNumber)
            ? parseFloat(value)
            : valueAsNumber
        return onChange(
          `${parsedValue}` !== value || isNaN(parsedValue)
            ? value
            : parsedValue,
          name,
          event,
        )
      },
    }),
  ),
)
