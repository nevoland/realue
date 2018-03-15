import { compose, branch, withHandlers, withProps } from 'recompose'

import { hasProp } from './tools'

export const string = compose(
  branch(({ value }) => value == null, withProps({ value: '' })),
  branch(
    hasProp('onChange'),
    withHandlers({
      onChange: ({ name, onChange }) => event =>
        onChange(event.target.value, name, event),
    }),
  ),
)
