import { Component as BaseComponent } from 'react'
import { identity, mapValues, map, isString, isArray } from 'lodash'

import { $, setWrapperName } from './tools'
import { EMPTY_OBJECT } from './immutables'

const DEFAULT_CHILDREN_PROPS = ({ item, ...props }) => (value, index) => ({
  ...props,
  ...item(index),
})

export function withChildren(
  ChildrenComponent,
  childProps = DEFAULT_CHILDREN_PROPS,
  { destinationName = 'children', valueName = 'value' } = EMPTY_OBJECT,
) {
  /*
  Builds an array that maps every item from the `[valueName]` prop (`'value'` by default) with the result of `<Component {...childProps(props)(itemValue, itemIndex)}` and injects it as a `[destinationName]` prop (`'children'` by default).

  Example:
  
    function Item({ value }) {
      return $('li', value)
    }
    const List = compose(
      array,
      withChildren(Item),
    )('ul')
    const element = $(List, { value: [1, 2, 3] })
  */
  return (Component) =>
    setWrapperName(
      Component,
      class withChildren extends BaseComponent {
        render() {
          const { props } = this
          const value = props[valueName]
          return $(Component, {
            ...props,
            [destinationName]: ((childProps) =>
              map(value, (value, index) =>
                $(ChildrenComponent, childProps(value, index)),
              ))(childProps(props)),
          })
        }
      },
    )
}

const DEFAULT_CHILD_PROPS = (props, name) =>
  props.property ? { ...props, ...props.property(name) } : props

export function withChild(
  ChildComponentOrMap,
  childProps = identity,
  { destinationName = 'children' } = EMPTY_OBJECT,
) {
  /*
  If `ChildComponentOrMap` is a component, builds an element from the provided `ChildComponentOrMap` with the props from `childProps(props)` and injects it as a `[destinationName]` prop (`'children'` by default).
  Otherwise, if `ChildComponentOrMap` is a mapping of `name: [Component, childProps()] | Component`, transforms this mapping into `name: $(Component, childProps(props, name))` and injects it into the props at `destinationName` (`'children'` by default). If `childProps` is not defined, defaults to returning the result of `props.property(name)` merged into the props, if `props.property` is defined, or just the `props`.

  Example:

    const Person = compose(
      withChild({
        name: StringInput,
        lastName: StringInput,
        age: NumberInput,
      }),
    )(({ children }) => $('div', children.name, children.lastName, children.age))
  */
  if (
    typeof ChildComponentOrMap === 'function' ||
    isString(ChildComponentOrMap) ||
    ChildComponentOrMap.$$typeof != null
  ) {
    return (Component) =>
      setWrapperName(
        Component,
        class withChild extends BaseComponent {
          render() {
            const { props } = this
            return $(Component, {
              ...props,
              [destinationName]: $(ChildComponentOrMap, childProps(props)),
            })
          }
        },
      )
  }
  const components = mapValues(ChildComponentOrMap, (value) =>
    isArray(value) ? value : [value, DEFAULT_CHILD_PROPS],
  )
  return (Component) =>
    setWrapperName(
      Component,
      class withChild extends BaseComponent {
        render() {
          const { props } = this
          return $(Component, {
            ...props,
            [destinationName]: mapValues(components, (value, name) =>
              $(value[0], value[1](props, name)),
            ),
          })
        }
      },
    )
}
