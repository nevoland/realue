import { branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const string = branch(
  hasProp('onChange'),
  withHandlers({
    onChange: ({ name, onChange }) => event =>
      onChange(event.target.value, name, event),
  }),
)
