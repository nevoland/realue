import { replace, trim } from "lodash"
import { createElement as $ } from "react"

import { EMPTY_OBJECT } from "./immutables"
import { escapeRegex, setWrapperName } from "./tools"

export const number = (Component) =>
  /*
  Sets `value` to `0` if `nil`.
  */
  setWrapperName(Component, function number(props) {
    const { value } = props
    return $(Component, {
      ...props,
      value: value == null ? 0 : value,
    })
  })

export function parseNumber(
  value,
  { radix = ".", thousandsSeparator = "," } = EMPTY_OBJECT,
) {
  const formattedValue = replace(
    trim(trim(value), radix),
    new RegExp(escapeRegex(thousandsSeparator), "g"),
    "",
  )
  const parsedValue = parseFloat(formattedValue)
  return `${parsedValue}` !== formattedValue || isNaN(parsedValue)
    ? value
    : parsedValue
}