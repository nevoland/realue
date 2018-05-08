import { trim } from 'lodash'
import { compose, branch, withHandlers, withProps } from 'recompose'

import { hasProp, hasNotProp } from './tools'

export const number = compose(
  branch(hasNotProp('value'), withProps({ value: 0 })),
  branch(
    hasProp('onChange'),
    withHandlers({
      onChange: ({ onChange }) => (value, name, payload) => {
        if (value == null) {
          return onChange(value, name, payload)
        }
        const formattedValue = trim(value, '.')
        const parsedValue = parseFloat(formattedValue)
        return onChange(
          `${parsedValue}` !== formattedValue || isNaN(parsedValue)
            ? value
            : parsedValue,
          name,
          payload,
        )
      },
    }),
  ),
)
