import { compose, branch, withHandlers } from 'recompose'

import { hasProp } from './tools'

export const boolean = branch(
  hasProp('onChange'),
  compose(
    withHandlers({
      onChange: ({ name, onChange }) => (value, event) =>
        onChange(value, name, event),
      onEvent: ({ name, onChange }) => event =>
        onChange(event.target.checked, name, event),
    }),
    withHandlers({
      toggle: ({ value, onChange }) => event => onChange(!value, event),
    }),
  ),
)
