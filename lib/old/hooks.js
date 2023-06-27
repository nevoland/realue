import { createElement as $, useState, useRef, useEffect } from 'react'
import {
  upperFirst,
  identity,
  mapValues,
  omitBy,
  invert,
  reduce,
  isString,
  isArray,
  map,
  fromPairs,
} from 'lodash'
import { setDisplayName, wrapDisplayName, getDisplayName } from 'recompose'
import PropTypes from 'prop-types'

import { same, stubArray, different } from './immutables'
import { stubNull } from './tools'

export const IGNORE = '__ignore'
export const COMPONENT = '__component'
export const RENDER = '__render'

export const withHops = (...hops) => {
  /*
  TODO:
  x renderComponent
  x renderNothing
  x shouldUpdate
  x onlyUpdateForKeys
  - ~~onlyUpdateForPropTypes~~
  x toRenderProps
  - ~~fromRenderProps~~
  - ~~toClass~~
  - lifecycle
  */
  const propsDecorator = reduce(
    hops,
    (result, decorator) => (props) => decorator(result(props)),
    identity,
  )
  return (Component) =>
    setDisplayName(wrapDisplayName(Component, 'withHops'))((props) => {
      const self = useRef()
      const nextProps = propsDecorator({ ...props, [COMPONENT]: Component })
      const ignore = nextProps[IGNORE]
      if (!ignore) {
        return (self.current = $(Component, nextProps))
      }
      return ignore === true ? self.current : ignore
    })
}

export function withHook(hook, source = stubArray, result = stubNull) {
  const sourceValues =
    source == null
      ? stubArray
      : isString(source)
      ? (props) => [props[source]]
      : isArray(source)
      ? (props) => map(source, (name) => props[name])
      : source
  const resultValues =
    result == null
      ? stubNull
      : isString(result)
      ? (values) => ({ [result]: values })
      : isArray(result)
      ? (values) =>
          fromPairs(map(result, (name, index) => [name, values[index]]))
      : result
  return (props) => ({
    ...props,
    ...resultValues(hook(...sourceValues(props))),
  })
}

export function renderComponent(Component) {
  return (props) => {
    return props[IGNORE] ? props : { ...props, [IGNORE]: $(Component, props) }
  }
}

export const renderNothing = renderComponent(stubNull)

export function shouldUpdate(test) {
  return (props) => {
    const self = useRef()
    if (props[IGNORE]) {
      return props
    }
    if (self.current == null) {
      self.current = props
      return props
    }
    if (!test(self.current, props)) {
      self.current = props
      return { ...props, [IGNORE]: true }
    }
    return props
  }
}

export function onlyUpdateForKeys(propKeys) {
  return shouldUpdate((props, nextProps) => !same(props, nextProps, propKeys))
}

export function branch(test, left, right) {
  return (props) => {
    const result = test(props)
    const leftProps = left(result ? props : { ...props, [IGNORE]: true })
    const rightProps = !right
      ? props
      : right(result ? { ...props, [IGNORE]: true } : props)
    return test(props) ? leftProps : rightProps
  }
}

export function setPropTypes(propTypes) {
  return process.env.NODE_ENV === 'production'
    ? identity
    : (props) => {
        if (props[IGNORE]) {
          return props
        }
        PropTypes.checkPropTypes(
          propTypes,
          props,
          'prop',
          getDisplayName(props[COMPONENT]),
        )
        return props
      }
}

export function defaultProps(props) {
  return (ownerProps) => ({
    ...props,
    ...ownerProps,
  })
}

export function withHandlers(handlersOrFactory) {
  return (props) => {
    const self = useRef()
    if (props[IGNORE]) {
      return props
    }
    if (self.current == null) {
      self.current = {
        props,
        handlers: mapValues(
          typeof handlersOrFactory === 'function'
            ? handlersOrFactory(props)
            : handlersOrFactory,
          (createHandler, name) => (...args) => {
            const { cache, props } = self.current
            const cachedHandler = cache[name]
            if (cachedHandler) {
              return cachedHandler(...args)
            }
            const handler = createHandler(props)
            if (
              process.env.NODE_ENV !== 'production' &&
              typeof handler !== 'function'
            ) {
              // eslint-disable-next-line no-console
              console.error(
                `withHandlers(): Expected a map of higher-order functions. Refer to the docs for more info.`,
              )
            }
            cache[name] = handler
            return handler(...args)
          },
        ),
      }
    }
    self.current.props = props
    self.current.cache = {}
    return {
      ...props,
      ...self.current.handlers,
    }
  }
}

export function withProps(createProps) {
  /*
  Injects the provided `createProps` object or the result of `createProps(props)`.
  Beware that if `createProps` is a function and that state changes occur after `withProps`, `createProps` will be re-evaluated.
  */
  return typeof createProps === 'function'
    ? withPropsOnChange(different, createProps)
    : (props) =>
        props[IGNORE]
          ? props
          : {
              ...props,
              ...createProps,
            }
}

export function mapProps(propsMapper) {
  return (props) => (props[IGNORE] ? props : propsMapper(props))
}

export function flattenProp(propName) {
  return (props) =>
    props[IGNORE]
      ? props
      : {
          ...props,
          ...props[propName],
        }
}

export function renameProp(oldName, newName) {
  return (props) => {
    if (props[IGNORE]) {
      return props
    }
    const { [oldName]: value, ...otherProps } = props
    return {
      ...otherProps,
      [newName]: value,
    }
  }
}

export function renameProps(nameMap) {
  const reversedMap = invert(nameMap)
  return (props) =>
    props[IGNORE]
      ? props
      : {
          ...omitBy(props, (value, name) => name in nameMap),
          ...mapValues(reversedMap, (name) => props[name]),
        }
}

export function withPropsOnChange(shouldMapOrKeys, propsMapper) {
  const shouldMap =
    typeof shouldMapOrKeys === 'function'
      ? shouldMapOrKeys
      : (prevProps, props) => !same(prevProps, props, shouldMapOrKeys)
  return (props) => {
    const self = useRef()
    if (props[IGNORE]) {
      return props
    }
    if (self.current == null || shouldMap(self.current.props, props)) {
      self.current = { props, computedProps: propsMapper(props) }
    }
    return {
      ...props,
      ...self.current.computedProps,
    }
  }
}

const EMPTY = Symbol('empty')

export function withState(
  stateName,
  stateUpdaterName = `set${upperFirst(stateName)}`,
  initialState,
) {
  const initState =
    typeof initialState === 'function' ? initialState : () => initialState
  return (props) => {
    const state = useState(EMPTY)
    if (props[IGNORE]) {
      return props
    }
    let value = state[0]
    if (state === EMPTY) {
      value = initState(props)
      state[1](value)
    }
    return {
      ...props,
      [stateName]: value,
      [stateUpdaterName]: state[1],
    }
  }
}

export const toRenderProps = (props) =>
  props[IGNORE] ? props : { ...props, children: props.children(props) }

export function usePrevious(value) {
  const self = useRef()
  useEffect(() => {
    self.current = value
  })
  return self.current
}

export function lifecycle(spec) {
  return (props) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      spec.hasOwnProperty('render')
    ) {
      console.error(
        'lifecycle() does not support the render method; its behavior is to pass all props and state to the base component.',
      )
    }
    const self = useRef()
    const state = useState(spec.state)
    let { current } = self
    const thens = []
    const prevProps = current && current.props
    const prevState = current && current.state
    if (!props[IGNORE]) {
      if (!current) {
        current = Object.create(spec)
      }
      current.props = props
      current.state = state[0]
      current.setState = (next, then) => {
        current.state = {
          ...current.state,
          ...(typeof next === 'function' ? next(current.state, props) : next),
        }
        state[1](current.state)
        if (then) {
          thens.push(then)
        }
      }
    }
    useEffect(
      () => {
        if (props[IGNORE]) {
          return
        }
        if (current.componentDidMount) {
          current.componentDidMount.call(current)
        }
        return () => {
          if (current.componentWillUnmount) {
            current.componentWillUnmount.call(current)
          }
        }
      },
      [(!props[IGNORE] && current) || null],
    )
    useEffect(() => {
      if (props[IGNORE]) {
        return
      }
      if (!self.current) {
        return
      }
      if (thens.length > 0) {
        for (const then of thens) {
          then()
        }
      }
      if (current.componentDidUpdate) {
        current.componentDidUpdate.call(current, prevProps, prevState)
      }
    })
    if (self.current !== current) {
      self.current = current
    }
    return prevState ? { ...props, ...prevState } : props
  }
}

const DEFAULT_PROMISE_STATE = {
  value: null,
  error: null,
  done: false,
}

export function promisedProp(name) {
  return (props) => {
    const state = useState(DEFAULT_PROMISE_STATE)
    const value = state[0]
    useEffect(
      () => {
        let active = true
        const promise = props[name]
        if (promise == null) {
          return
        }
        promise.then(
          (value) => {
            if (!active) {
              return
            }
            state[1]({ value, error: null, done: true })
            return value
          },
          (error) => {
            if (!active) {
              return
            }
            state[1]({ value: null, error, done: true })
          },
        )
        return () => {
          active = false
        }
      },
      [props[name]],
    )
    return {
      ...props,
      [name]: value,
    }
  }
}
