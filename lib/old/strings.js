import { branch, withProps } from "recompose"

import { hasNotProp } from "./tools"

export const string = branch(
  /*
  Sets `value` to `''` if not set.
  */
  hasNotProp("value"),
  withProps({ value: "" }),
)
