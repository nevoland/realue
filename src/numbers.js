import { replace, trim } from 'lodash'
import { branch, withProps } from 'recompose'

import { hasNotProp, escapeRegex } from './tools'
import { EMPTY_OBJECT } from './immutables'

export const number = branch(
  /*
  Sets `value` to `0` if not set.
  */
  hasNotProp('value'),
  withProps({ value: 0 }),
)

export function parseNumber(
  value,
  { radix = '.', thousandsSeparator = ',' } = EMPTY_OBJECT,
) {
  const formattedValue = replace(
    trim(trim(value), radix),
    new RegExp(escapeRegex(thousandsSeparator), 'g'),
    '',
  )
  const parsedValue = parseFloat(formattedValue)
  return `${parsedValue}` !== formattedValue || isNaN(parsedValue)
    ? value
    : parsedValue
}
