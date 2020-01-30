import { Component as BaseComponent } from 'react'
import {
  keys,
  omit,
  isString,
  upperFirst,
  debounce,
  throttle,
  indexOf,
  identity,
  pick,
} from 'lodash'
import {
  compose,
  mapProps,
  withHandlers,
  withProps,
  withPropsOnChange,
} from 'recompose'

import { EMPTY_OBJECT, same } from './immutables'
import { $, setWrapperName, getGlobal, picked } from './tools'

/* eslint-disable no-console */
function wrapProps(
  title,
  currentWrappedMethods,
  props,
  previousProps,
  propNames,
) {
  let wrappedMethods = currentWrappedMethods
  let updated = false
  console.group(title)
  for (const name of propNames || keys(props)) {
    const value = props[name]
    const previousValue = previousProps[name]
    if (value !== previousValue) {
      if (!updated) {
        updated = true
      }
      if (typeof value === 'function') {
        if (wrappedMethods === currentWrappedMethods) {
          wrappedMethods = { ...currentWrappedMethods }
        }
        wrappedMethods[name] = (...parameters) => {
          console.group(`Calling "${title}.${name}" with parameters:`)
          for (const parameter of parameters) {
            console.log(parameter)
          }
          console.groupEnd()
          return value(...parameters)
        }
      }
      console.group(name)
      console.log('Previous:', previousValue)
      console.log('New:', value)
      console.groupEnd()
    }
  }
  if (!updated) {
    console[propNames ? 'log' : 'warn'](
      'Element got re-rendered with no property changes',
    )
  }
  console.groupEnd()
  for (const name in wrappedMethods) {
    if (props[name] == null) {
      if (wrappedMethods === currentWrappedMethods) {
        wrappedMethods = { ...currentWrappedMethods }
      }
      delete wrappedMethods[name]
    }
  }
  /* eslint-enable no-console */
  return {
    wrappedMethods,
    props,
  }
}

export function logProps(propNames, title) {
  /*
  Logs the provided `propNames` whenever they change.
  The `title` defaults to the component name.
  If `propNames` is `nil`, logs all props.
  */
  if (process.env.NODE_ENV === 'production') {
    return identity
  }
  return (Component) =>
    setWrapperName(
      Component,
      class logProps extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = wrapProps(
            title || Component.displayName || Component.name,
            EMPTY_OBJECT,
            props,
            EMPTY_OBJECT,
            propNames,
          )
        }
        static getDerivedStateFromProps(props, state) {
          return wrapProps(
            title || Component.displayName || Component.name,
            state.wrappedMethods,
            props,
            state.props,
            propNames,
          )
        }
        render() {
          return $(Component, { ...this.props, ...this.state.wrappedMethods })
        }
      },
    )
}

export function omitProps(propNames) {
  /*
  Removes provided `propNames`.
  */
  return mapProps((props) => omit(props, propNames))
}

export function makeShouldHandle(shouldHandleOrKeys) {
  return typeof shouldHandleOrKeys === 'function'
    ? shouldHandleOrKeys
    : (props, nextProps) => !same(props, nextProps, shouldHandleOrKeys)
}

export function withEffect(shouldHandleOrKeys, handler) {
  /*
  Similar to `useEffect`. Runs `handler(props)` at mount and on update when `shouldHandleOrKeys`, in case it is an array of prop names, mentions a prop name whose value changed, or, in case of a function, returns `true` when called with `(prevProps, nextProps)`.
  If the handler returns a callback, it is called on update before the next `handler` call or on unmount.

  Example:

    // Listens for a given event and updates whenever `event` or `listener` changes
    const withListener = withEffect(
      ['event', 'listener'],
      ({ event: eventName, listener }) => {
        window.addEventListener(eventName, listener)
        return () => window.removeEventListener(eventName, listener)
      },
    )
  */
  const shouldHandle = makeShouldHandle(shouldHandleOrKeys)
  return (Component) =>
    setWrapperName(
      Component,
      class withEffect extends BaseComponent {
        constructor(props) {
          super(props)
          this.cleanup = null
        }
        componentDidMount() {
          this.cleanup = handler(this.props)
        }
        componentDidUpdate(prevProps) {
          if (shouldHandle(prevProps, this.props)) {
            if (typeof this.cleanup === 'function') {
              this.cleanup()
            }
            this.cleanup = handler(this.props)
          }
        }
        componentWillUnmount() {
          if (typeof this.cleanup === 'function') {
            this.cleanup()
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}

export function withImmediateEffect(shouldHandleOrKeys, handler) {
  /*
  Similar to `withEffect`, except that it runs the `handler` at component construction and before each render if `shouldHandleOrKeys` returns `true`.
  */
  const shouldHandle = makeShouldHandle(shouldHandleOrKeys)
  return (Component) =>
    setWrapperName(
      Component,
      class withImmediateEffect extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = { props, cleanup: handler(this.props) }
        }
        static getDerivedStateFromProps(props, state) {
          if (shouldHandle(state.props, props)) {
            if (typeof state.cleanup === 'function') {
              state.cleanup()
            }
            return { props, cleanup: handler(props, state.value) }
          }
          return null
        }
        componentWillUnmount() {
          const { state } = this
          if (typeof state.cleanup === 'function') {
            state.cleanup()
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}

export function withGlobalEffect(handler) {
  /*
  Runs `handler()` when the first element of this component is mounted.
  If the handler returns a callback, it is called when the last element of this component is unmounted.
  If the handler returns `false`, it will never be run again for this component.
  */
  let elementsCount = 0
  let cleanup = null
  return (Component) =>
    setWrapperName(
      Component,
      class withGlobalEffect extends BaseComponent {
        componentDidMount() {
          if (elementsCount === 0 && cleanup !== false) {
            cleanup = handler()
          }
          elementsCount += 1
        }
        componentWillUnmount() {
          elementsCount -= 1
          if (elementsCount === 0 && typeof cleanup === 'function') {
            cleanup()
            cleanup = null
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}

export function withImmediateGlobalEffect(handler) {
  /*
  Runs `handler()` when the first element of this component is constructed (that is, before it mounts).
  If the handler returns a callback, it is called when the last element of this component is unmounted.
  If the handler returns `false`, it will never be run again for this component.
  */
  let elementsCount = 0
  let cleanup = null
  return (Component) =>
    setWrapperName(
      Component,
      class withImmediateGlobalEffect extends BaseComponent {
        constructor(props) {
          super(props)
          if (elementsCount === 0 && cleanup !== false) {
            cleanup = handler()
          }
          elementsCount += 1
        }
        componentWillUnmount() {
          elementsCount -= 1
          if (elementsCount === 0 && typeof cleanup === 'function') {
            cleanup()
            cleanup = null
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}

export function onPropsChange(
  shouldHandleOrKeys,
  handler,
  callOnMount = true,
  callOnUnmount = false,
) {
  /*
  Similar to `withPropsOnChange`, except that the values of the `handler` are not merged into the props and that the `handler` is called with `(props, prevProps, mountState)`, with `mountState` set to `true` on mount, `null` on update and `false` on unmount.
  It is called when the component is first mounted if `callOnMount` is `true` (default value) and also when the component will unmount if `callOnUnmount` is `true` (`false` by default).
  */
  const shouldHandle = makeShouldHandle(shouldHandleOrKeys)
  return (Component) =>
    setWrapperName(
      Component,
      class onPropsChange extends BaseComponent {
        componentDidMount() {
          if (callOnMount) {
            handler(this.props, this.props, true)
          }
        }
        componentDidUpdate(prevProps) {
          const { props } = this
          if (shouldHandle(prevProps, props)) {
            handler(props, prevProps)
          }
        }
        componentWillUnmount() {
          if (callOnUnmount) {
            handler(this.props, this.props, false)
          }
        }
        render() {
          return $(Component, this.props)
        }
      },
    )
}

export function defaultProp(options) {
  /*
  Sets `[name]` to `[defaultName]` if `[name]` is `nil`.
  */
  const name = isString(options) ? options : options.name
  const { defaultName = `default${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(Component, function defaultProp(props) {
      const { [defaultName]: defaultValue, [name]: value } = props
      return $(
        Component,
        defaultValue == null
          ? props
          : {
              ...props,
              [name]: value == null ? defaultValue : value,
            },
      )
    })
}

export function initialProp(options) {
  /*
  Sets `[name]` to `[initialName]` on first render if `[initialName]` is not `nil`, then to `[name]` for subsequent renders.
  */
  const name = isString(options) ? options : options.name
  const { initialName = `initial${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class initialProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = { initial: true }
        }
        componentDidMount() {
          if (this.state.initial) {
            this.setState({ initial: false })
          }
        }
        render() {
          const { props } = this
          return $(
            Component,
            this.state.initial
              ? { ...props, [name]: props[initialName] }
              : props,
          )
        }
      },
    )
}

const { setTimeout, clearTimeout } = getGlobal()

export function suspendableProp(options) {
  /*
  Suspends `[name]` changes for `[delayName]` milliseconds. Subsequent `[name]` or `[delayName]` changes cancel previous suspensions. Last suspension is canceled if `[name]` is set to the value prior the start of the suspension.
  Calling the injected method `[onPullName]` immediately sets `[name]` to the latest value.
  If `[delayName]` is falsy, no suspension occurs, nor the injection of `[onPullName]`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class suspendableProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            value: props[name],
          }
          this.timer = null
          this.onPull = () => {
            if (!this.mounted) {
              return
            }
            const { props } = this
            if (this.timer) {
              clearTimeout(this.timer)
              this.timer = null
            }
            if (props[name] === this.state.value) {
              return
            }
            this.setState({
              value: props[name],
            })
          }
        }
        componentDidMount() {
          this.mounted = true
        }
        static getDerivedStateFromProps(props, state) {
          if (props[delayName] || props[name] === state.value) {
            return null
          }
          return { value: props[name] }
        }
        componentDidUpdate(prevProps) {
          const { props } = this
          if (
            props[name] === prevProps[name] &&
            props[delayName] === prevProps[delayName]
          ) {
            return
          }
          if (this.timer !== null) {
            clearTimeout(this.timer)
            this.timer = null
          }
          if (props[delayName] && props[name] !== this.state.value) {
            this.timer = setTimeout(this.onPull, props[delayName])
          }
        }
        componentWillUnmount() {
          this.mounted = false
        }
        render() {
          const { props } = this
          return $(
            Component,
            !props[delayName]
              ? props
              : {
                  ...props,
                  [name]: this.state.value,
                  [onPullName]: this.onPull,
                },
          )
        }
      },
    )
}
export function delayableHandler(options) {
  /*
  Delays `[handler]` calls until after `[filter]` become true.
  */
  const handler = options.handler
  const filter = options.filter
  return (Component) =>
    setWrapperName(
      Component,
      class delayableHandler extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            shouldTrigger: false,
          }
          this.trigger = () => {
            const {
              props: { [handler]: triggerFunction, [filter]: value },
            } = this
            if (value) {
              triggerFunction()
              this.setState({ shouldTrigger: false })
            } else {
              this.setState({ shouldTrigger: true })
            }
          }
        }
        static getDerivedStateFromProps(props, state) {
          const { [handler]: triggerFunction, [filter]: value } = props
          const { shouldTrigger } = state
          if (
            triggerFunction === state.triggerFunction &&
            value === state.value
          ) {
            return null
          } else {
            if (shouldTrigger) {
              triggerFunction()
            }
            return {
              triggerFunction,
              value,
              shouldTrigger: false,
            }
          }
        }
        render() {
          const { props } = this
          return $(Component, {
            ...props,
            [handler]: this.trigger,
          })
        }
      },
    )
}

export function delayableProp(options) {
  /*
  Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call if `options.mode` is `'debounce'` (default value), or calls `[name]` at most once every `[delayName]` milliseconds if `options.mode` is `'throttle'`. The `mode` can also be a function that returns a callback based from the `([name], [delayName])` arguments.
  Renames undelayed `[name]` as `['onPush' + name]`.
  If `[delayName]` is falsy, no delay occurs nor the injection of `[onPushName]`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPushName = `onPush${capitalizedName}`,
    mode = 'debounce',
  } = name === options ? EMPTY_OBJECT : options
  const debouncer =
    mode === 'debounce' ? debounce : mode === 'throttle' ? throttle : mode
  if (process.env.NODE_ENV !== 'production') {
    if (typeof debouncer !== 'function') {
      throw new Error(`Unknown debounce mode supplied: "${mode}"`)
    }
  }
  return (Component) =>
    setWrapperName(
      Component,
      class delayableProp extends BaseComponent {
        constructor(props) {
          super(props)
          const { [name]: value, [delayName]: delay } = props
          this.state = {
            value,
            delay,
            debouncedValue: !delay ? null : debouncer(value, delay),
          }
        }
        static getDerivedStateFromProps(props, state) {
          const { [name]: value, [delayName]: delay } = props
          if (value === state.value && delay === state.delay) {
            return null
          }
          const { debouncedValue } = state
          if (debouncedValue && typeof debouncedValue.cancel === 'function') {
            debouncedValue.cancel()
          }
          return {
            value,
            delay,
            debouncedValue: debouncer(value, delay),
          }
        }
        componentWillUnmount() {
          const { debouncedValue } = this.state
          if (debouncedValue && typeof debouncedValue.cancel === 'function') {
            debouncedValue.cancel()
          }
        }
        render() {
          const { props } = this
          return $(
            Component,
            !props[delayName]
              ? props
              : {
                  ...props,
                  [name]: this.state.debouncedValue,
                  [onPushName]: props[name],
                },
          )
        }
      },
    )
}

export function editableProp(options) {
  /*
  Enables a value prop of a given `name` to be locally editable.
  The value can be updated with `[onChangeName]`.
  */
  const name = isString(options) ? options : options.name
  const { onChangeName = `onChange${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class editableProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            value: props[name],
          }
          this.onChange = (value) => this.setState({ value })
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
            [onChangeName]: this.onChange,
          })
        }
      },
    )
}

const SCOPE = '__scope'
const RETURN = '__return'

export function scoped(...decorators) {
  /*
  Processes the `decorators` in an isolated props scope so as to avoid poluting the passed props.

  Example:
  
    compose(
      withProps({ value: 1 }),
      scoped(
        withProps({ value: 2, otherValue: 3 })
      ),
      // Logs unique prop `value` that equals `1`
      logProps()
    )

  */
  return compose(
    mapProps((props) => ({ ...props, [SCOPE]: props })),
    ...decorators,
    mapProps((props) =>
      props[RETURN] ? { ...props[SCOPE], ...props[RETURN] } : props[SCOPE],
    ),
  )
}

export function returned(propsMapperOrMap) {
  /*
  Enables the injection of props from an isolated scope. The `propsMapperOrMap` can be a function that takes the current props and returns the props to inject, or a name list or map of prop names similar to the one provided to `picked()`.

  Example:

    scoped(...decorators, returned({ user: 'value' }))

  */
  const returnedProps =
    typeof propsMapperOrMap === 'function'
      ? propsMapperOrMap
      : picked(propsMapperOrMap)
  return withProps((props) => ({ [RETURN]: returnedProps(props) }))
}

export function box(inputMapperOrMap, decorator, outputMapperOrMap) {
  /*
  Boxes the execution of one or several `decorators` with the picked `inputMapperOrMap` and injects into the props the one picked by `outputMapperOrMap`.

  Example:

    box(
      ['value', 'request'],
      compose(
        withEntityQuery,
        queried,
        flattenValue,
      ),
      ['value', 'done', 'error']
    )

  */
  const inputProps =
    typeof inputMapperOrMap === 'function'
      ? inputMapperOrMap
      : picked(inputMapperOrMap)
  const outputProps =
    typeof outputMapperOrMap === 'function'
      ? outputMapperOrMap
      : picked(outputMapperOrMap)
  return compose(
    mapProps((props) => ({ ...inputProps(props), [SCOPE]: props })),
    decorator,
    mapProps((props) => ({ ...props[SCOPE], ...outputProps(props) })),
  )
}

export function syncedProp(options) {
  /*
  Enables a prop with a given `name` to be locally editable while staying in sync with its parent value.
  The prop can be updated with prop `[onChangeName](value, name, payload)`, which triggers the optional parent prop `[onChangeName]`.
  Calling `[onPullName]()` sets the local value to the parent value.
  The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[onPullName]()`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class syncedProp extends BaseComponent {
        constructor(props) {
          super(props)
          const { value } = props
          this.state = {
            value,
            originalValue: value,
          }
          this.onChange = (value, name, payload) => {
            if (value === this.state.value) {
              return
            }
            const { [onChangeName]: onChange } = this.props
            return this.setState(
              { value },
              onChange == null
                ? undefined
                : () => onChange(value, name, payload),
            )
          }
          this.onPull = () => {
            const {
              props: { [onPullName]: onPull },
              state: { value, originalValue },
            } = this
            const nextValue =
              onPull == null ? originalValue : onPull(originalValue, value)
            this.setState({
              value: nextValue,
            })
            return nextValue
          }
        }
        static getDerivedStateFromProps(props, state) {
          const { [name]: value, [onPullName]: onPull } = props
          if (value === state.originalValue) {
            return null
          }
          return {
            value: onPull == null ? value : onPull(value, state.value),
            originalValue: value,
          }
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
            [onChangeName]: this.onChange,
            [onPullName]: this.onPull,
          })
        }
      },
    )
}

export function cycledProp(options) {
  /*
  Injects prop `[onCycleName](payload)` that cycles the value of prop `[name]` through the values found in prop `[valuesName]` which default to `[false, true]`.
  Calls `[onChangeName](value, name, payload)` with `name` taken from prop `[nameName]` or `name`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    valuesName = `${name}Values`,
    onCycleName = `onCycle${capitalizedName}`,
    onChangeName = `onChange${capitalizedName}`,
    nameName = `${name}Name`,
  } = name === options ? EMPTY_OBJECT : options
  return withHandlers({
    [onCycleName]: ({
      [name]: value,
      [valuesName]: values = [false, true],
      [onChangeName]: onChange,
      [nameName]: valueName = name,
    }) => (payload) => {
      const index = indexOf(values, value) + 1
      onChange(values[index === values.length ? 0 : index], valueName, payload)
    },
  })
}

export function resilientProp(options) {
  /*
  Keeps the last non-`nil` value of prop `[name]`.
  If `constantName` is provided, keeps the last non-`nil` value of prop `[name]` only if prop `[constantName]` did change.
  */
  const name = isString(options) ? options : options.name
  const { constantName = null } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class resilientProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = {
            value: props[name],
            constant: constantName ? props[constantName] : null,
          }
        }
        static getDerivedStateFromProps(props, state) {
          const value = props[name]
          return constantName && props[constantName] === state.constant
            ? null
            : value == null || value === state.value
            ? constantName
              ? { value: state.value, constant: props[constantName] }
              : null
            : { value, constant: constantName ? props[constantName] : null }
        }
        render() {
          return $(Component, {
            ...this.props,
            [name]: this.state.value,
          })
        }
      },
    )
}

export function groupProps(destinationName, propNames) {
  /*
  Groups `propNames` into an object stored at `destinationName` and updates them when any property value listed in `propNames` changes.
  */
  return withPropsOnChange(propNames, (props) => ({
    [destinationName]: pick(props, propNames),
  }))
}
