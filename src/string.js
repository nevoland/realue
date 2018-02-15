import { compose, branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const string = branch(
  hasProp('onChange'),
  compose(
    withHandlers({
      onChange: ({ value, name = value, onChange }) => event =>
        onChange(event.target.value, name, event),
    }),
  ),
)
