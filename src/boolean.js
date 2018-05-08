import { compose, branch, withHandlers, withProps } from 'recompose'

import { hasProp, hasNotProp } from './tools'

export const boolean = compose(
  branch(hasNotProp('value'), withProps({ value: false })),
  branch(
    hasProp('onChange'),
    compose(
      withHandlers({
        toggle: ({ value, name, onChange }) => payload =>
          onChange(!value, name, payload),
      }),
    ),
  ),
)
