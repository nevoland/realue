import { every, memoize } from "lodash"
import { getDisplayName, wrapDisplayName } from "recompose"

/*
Returns a function that checks if `props[name]` is not `nil`.
*/
export const hasProp = memoize((name) => ({ [name]: prop }) => prop != null)

/*
Returns a function that checks if `props[name]` is `nil`.
*/
export const hasNotProp = memoize((name) => ({ [name]: prop }) => prop == null)

/*
Returns a function that checks if every prop `name` in `names` is not `nil`.
*/
export const hasProps = (names) => (props) =>
  every(names, (name) => props[name] != null)

const REGEX_CHARS_PATTERN = /[.?*+^$[\]\\(){}|-]/g
export function escapeRegex(pattern) {
  return (`${pattern  }`).replace(REGEX_CHARS_PATTERN, "\\$&")
}

export function isValidDate(date) {
  return !isNaN(date.getTime())
}

export function pickValue({ value }) {
  return value
}

export function called(object, property) {
  object[property]()
  return object
}

export function lazyProperty(object, propertyName, valueBuilder) {
  /*
  Returns `object[propertyName]` if not `nil`, otherwise sets the result of `valueBuilder(object)` to it and returns it.
  This enables setting properties only when it is first fetched.
  */
  const value = object[propertyName]
  if (value != null) {
    return value
  }
  return (object[propertyName] = valueBuilder(object))
}

export function setWrapperName(Component, Wrapper) {
  if (process.env.NODE_ENV === "production") {
    return Wrapper
  }
  Wrapper.displayName = wrapDisplayName(Component, getDisplayName(Wrapper))
  return Wrapper
}

export function stubNull() {
  return null
}
