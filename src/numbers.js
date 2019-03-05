import { createElement as $ } from 'react'
import { replace, trim } from 'lodash'

import { setWrapperName, escapeRegex } from './tools'
import { EMPTY_OBJECT } from './immutables'

export const number = (Component) =>
  /*
  Sets `value` to `0` if `nil`.
  */
  setWrapperName(Component, function number(props) {
    return $(
      Component,
      props.value != null
        ? props
        : {
            ...props,
            value: 0,
          },
    )
  })

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
