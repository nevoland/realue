import { branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const boolean = branch(
  /*
  Sets `value` to `false` if not set.
  */
  hasNotProp('value'),
  withProps({ value: false }),
)
