import { branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const date = branch(
  hasNotProp('value'),
  withProps({ value: new Date(0) }),
)
