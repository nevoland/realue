import { branch, withProps } from 'recompose'

import { hasNotProp } from './tools'

export const boolean = branch(hasNotProp('value'), withProps({ value: false }))
