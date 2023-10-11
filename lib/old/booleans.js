import { createElement as $ } from "react"

import { setWrapperName } from "./tools"

export const boolean = (Component) =>
  /*
  Sets `value` to `false` if `nil`.
  */
  setWrapperName(Component, function boolean(props) {
    const { value } = props
    return $(Component, {
      ...props,
      value: value == null ? false : value,
    })
  })
