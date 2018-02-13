import { compose, branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const boolean = branch(
  hasProp('onChange'),
  compose(
    withHandlers({
      onChange: ({ value, name = value, onChange }) => (value, event) =>
        onChange(value, name, event),
      onEvent: ({ value, name = value, onChange }) => event =>
        onChange(event.target.checked, name, event),
    }),
    withHandlers({
      toggle: ({ value, onChange }) => event => onChange(!value, event),
    }),
  ),
)
