import { compose, branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const string = branch(hasNotProp('value'), withProps({ value: '' }))
