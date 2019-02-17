import { createElement as $, Component as BaseComponent } from 'react'
import { identity, mapValues, map, keys, isArray } from 'lodash'
import { withPropsOnChange } from 'recompose'

import { makeShouldHandle } from './properties'
import { setItem, EMPTY_OBJECT } from './immutables'

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
  ⚠️ DEPRECATED: Use `withArrayChildren` instead.

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
  ⚠️ DEPRECATED: `Component` as a map of components will not be supported. Use `withArrayChildren` instead.

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
DEPRECATED: Alias for `withChild`.  Will be removed.
*/
export const withElement = withChild

export function withArrayChildren(
  Component,
  shouldUpdateOrKeys = DEFAULT_KEYS,
  childProps = DEFAULT_CHILDREN_PROPS,
  valueName = 'value',
  destination = 'children',
) {
  /*
  Builds an array that maps every item from the `[valueName]` prop with the result of `<Component {...childProps(props)(itemValue, itemIndex)}  />` and injects it as a `[destination]` prop (`children` by default).
  The children are only updated if `shouldUpdateOrKeys` returns `true` or if a prop whose name is listed in it changes. By default, the children are updated when at least one of the following props changes: `['value', 'name', 'onChange']`.

  Example:

    function Item({ value }) {
      return $('li', null, value)
    }
    const List = withChildren(Item,  ['value'], () => value => ({ value }))('ul')
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

const DEFAULT_SHOULD_HANDLE = makeShouldHandle(DEFAULT_KEYS)
const DEFAULT_PROPS_MAPPER = ({ property }, name) => property(name)

export function withObjectChildren(options, destination = 'children') {
  /*
  Builds an object mapping the keys of the provided `options` with the result of `<Component {...childProps(props, name)}/>` whenever `shouldUpdate(props, nextProps)` returns `true`, where `[ Component, shouldUpdate, childProps] = option`.

  Example:

    function ArticleView({ children }) {
      return (
        <div>
          {children.header}
          {children.body}
        </div>
      )
    }
    const Article = withObjectChildren({
      header: ['h2', ['value'], ({ value }) => ({ children: value.header })],
      body: ['p', ['value'], ({ value }) => ({ children: value.body })],
    })
    <Article value={{ header: 'Title', body: 'Text' }} />

  Note that the above `Article` could be defined as:

    const Article = withObjectChildren({ header: 'h2', body: 'p' })

  */
  const formattedOptions = mapValues(options, (option) =>
    isArray(option)
      ? setItem(option, 1, makeShouldHandle(option[1]))
      : [option, DEFAULT_SHOULD_HANDLE, DEFAULT_PROPS_MAPPER],
  )
  const properties = keys(formattedOptions)
  return (Component) =>
    class withChildrenProperties extends BaseComponent {
      constructor(props) {
        super(props)
        this.state = this.constructor.getDerivedStateFromProps(
          props,
          EMPTY_OBJECT,
        )
      }
      static getDerivedStateFromProps(props, state) {
        const { length } = properties
        const {
          children: prevChildren = EMPTY_OBJECT,
          props: prevProps = EMPTY_OBJECT,
        } = state
        let children = prevChildren
        for (let i = 0; i < length; i++) {
          const name = properties[i]
          const setup = formattedOptions[name]
          if (setup[1](prevProps, props)) {
            if (children === prevChildren) {
              children = { ...prevChildren }
            }
            children[name] = $(setup[0], setup[2](props, name))
          }
        }
        return {
          props,
          children,
        }
      }
      render() {
        return $(Component, {
          ...this.props,
          [destination]: this.state.children,
        })
      }
    }
}
