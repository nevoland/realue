import { compose, branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const string = compose(
  branch(hasNotProp('value'), withProps({ value: '' })),
)
