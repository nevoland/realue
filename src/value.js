import { branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const value = branch(
  hasProp('onChange'),
  withHandlers({
    onChange: ({ value, name = value, onChange }) => (value, event) =>
      onChange(value, name, event),
  }),
)
