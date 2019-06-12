import { createElement, isValidElement } from 'react'
import { every, memoize, pick, mapValues, get, omit } from 'lodash'
import { wrapDisplayName, getDisplayName } from 'recompose'

const { isArray } = Array

export function $(component, propsOrChild, ...children) {
  /*
  Creates a react element from the provided `component`, setting its props to `propsOrChild` if it is an object or `null`, and its children to `propsOrChild` if it is not an object and the rest of the provided `children`.

  Similar to a reduced version of [hyperscript](https://github.com/hyperhype/hyperscript).

  Examples:

    $('div',
      $('h1', 'Realue'),
      $('p', 'A simple set of tools and decorators for React.'),
      $('p', { style: { color: 'gold' } }, 'Watchout, it is very addictive.'),
    )
  */
  return typeof propsOrChild === 'object' &&
    !isArray(propsOrChild) &&
    !isValidElement(propsOrChild)
    ? createElement(component, propsOrChild, ...children)
    : createElement(component, null, propsOrChild, ...children)
}

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
  /*
  Escapes special characters of a given regular expresion `pattern`.
  */
  return (pattern + '').replace(REGEX_CHARS_PATTERN, '\\$&')
}

export function replaceAll(string, find, replace) {
  /*
  Replaces all occurrences of `find` by `replace` in the provided `string`.
  */
  return string.replace(new RegExp(escapeRegex(find), 'g'), replace)
}

export function isValidDate(date) {
  return !isNaN(date.getTime())
}

export function picked(propNamesOrMap) {
  /*
  Returns a function that returns a subset of the provided object or a mapping of selected property paths.

  Examples:

    // Only keeps the `value` prop
    mapProps(picked(['value']))

    // Only keeps the `value` prop renamed to `user`
    mapProps(picked({ user: 'value' }))

    // Injects selected properties of `value`
    withProps(picked({ done: 'value.done', error: 'value.error', value: 'value.value' }))

  */
  if (isArray(propNamesOrMap)) {
    return (props) => pick(props, propNamesOrMap)
  }
  return (props) => mapValues(propNamesOrMap, (path) => get(props, path))
}

export function omitted(propNames) {
  /*
	 Returns a function that returns all props without the ones whose name is in `propNames`.

  Example :

  // Only omit the `value` prop
  returned(omitted(['value']))

  */
  return (props) => omit(props, propNames)
}

export function pickValue({ value }) {
  return value
}

export function called(object, property) {
  object[property]()
  return object
}

export function lazyProperty(object, propertyName, valueBuilder, ...options) {
  /*
  Returns `object[propertyName]` if not `nil`, otherwise sets the result of `valueBuilder(object)` to it and returns it.
  This enables setting properties only when it is first fetched.
  */
  const value = object[propertyName]
  if (value != null) {
    return value
  }
  return (object[propertyName] = valueBuilder(object, ...options))
}

export function setWrapperName(Component, Wrapper) {
  if (process.env.NODE_ENV === 'production') {
    return Wrapper
  }
  Wrapper.displayName = wrapDisplayName(Component, getDisplayName(Wrapper))
  return Wrapper
}

export function getGlobal() {
  return typeof window === 'undefined' ? global : window
}

export function isPromise(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.then === 'function'
  )
}
