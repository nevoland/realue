import { compose, branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const boolean = branch(
  hasProp('onChange'),
  compose(
    withHandlers({
      toggle: ({ value, name, onChange }) => event =>
        onChange(!value, name, event),
      onChange: ({ name, onChange }) => event =>
        onChange(event.target.checked, name, event),
    }),
  ),
)
