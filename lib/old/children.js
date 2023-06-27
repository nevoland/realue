import { createElement as $ } from 'react'
import { identity, mapValues, map } from 'lodash'
import { withPropsOnChange } from 'recompose'

const DEFAULT_KEYS = ['value', 'name', 'onChange']
const DEFAULT_CHILDREN_PROPS = ({ item }) => (value, index) => item(index)

export function withChildren(
  Component,
  childProps = DEFAULT_CHILDREN_PROPS,
  shouldUpdateOrKeys = DEFAULT_KEYS,
  valueName = 'value',
  destination = 'children',
) {
  /*
  Builds an array that maps every item from the `[valueName]` prop with the result of `<Component {...childProps(props)(itemValue, itemIndex)}` and injects it as a `[destination]` prop (`children` by default).
  The children are only updated if `shouldUpdateOrKeys` returns `true` or if a prop whose name is listed in it changes. By default, the children are updated when at least one of the following props changes: `['value', 'name', 'onChange']`.

  Example:

    function Item({ value }) {
      return $('li', null, value)
    }
    const List = withChildren(Item, () => value => ({ value }), ['value'])('ul')
  */
  return withPropsOnChange(shouldUpdateOrKeys, (props) => ({
    [destination]: map(
      props[valueName],
      ((childProps) => (value, index) =>
        $(Component, {
          key: index,
          ...childProps(value, index),
        }))(childProps(props)),
    ),
  }))
}

export function withChild(
  Component,
  childProps = identity,
  shouldUpdateOrKeys = DEFAULT_KEYS,
  destination = 'children',
) {
  /*
  Builds an element from the provided `Component` with the props from `childProps(props)` and injects it as a `[destination]` prop (`children` by default).
  The element is only updated if `shouldUpdateOrKeys` returns `true` or if a prop whose name is listed in it changes. By default, the element is updated when at least one of the following props changes: `['value', 'name', 'onChange']`.
  */
  if (typeof Component === 'function') {
    return withPropsOnChange(shouldUpdateOrKeys, (props) => ({
      [destination]: $(Component, childProps(props, null)),
    }))
  }
  return withPropsOnChange(shouldUpdateOrKeys, (props) => ({
    [destination]: mapValues(Component, (Component, name) =>
      $(Component, childProps(props, name)),
    ),
  }))
}

/*
DEPRECATED: Alias for `withChild`. 
*/
export const withElement = withChild
