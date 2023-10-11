import { createElement as $ } from "react"

import { setWrapperName } from "./tools"

export const date = (Component) =>
  /*
  Sets `value` to `new Date(0)` if `nil`.
  */
  setWrapperName(Component, function date(props) {
    const { value } = props
    return $(Component, {
      ...props,
      value: value == null ? new Date(0) : value,
    })
  })
