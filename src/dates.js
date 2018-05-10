import { branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const date = branch(
  /*
  Sets `value` to `new Date(0)` if not set.
  */
  hasNotProp('value'),
  withProps({ value: new Date(0) }),
)
