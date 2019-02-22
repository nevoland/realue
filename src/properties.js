import { createElement as $, Component as BaseComponent } from 'react'
import {
  keys,
  omit,
  isString,
  upperFirst,
  debounce,
  throttle,
  indexOf,
} from 'lodash'
import {
  mapProps,
  branch,
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose'

import { EMPTY_OBJECT, same } from './immutables'
import { hasProps, setWrapperName } from './tools'

export function logProps(propNames, title) {
  /*
  Logs the provided `propNames` whenever they change.
  The `title` defaults to the component name.
  If `propNames` is `nil`, logs all props.
  */
  return (Component) =>
    onPropsChange(propNames || undefined, (props) => {
      /* eslint-disable no-console */
      console.group(title || Component.displayName || Component.name)
      for (const name of propNames || keys(props)) {
        console.log(name, props[name])
      }
      console.groupEnd()
      /* eslint-enable no-console */
    })(Component)
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
          // No state update necessary here
          this.cleanup = handler(this.props)
        }
        componentDidUpdate(prevProps, prevState) {
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
        constructor(props) {
          super(props)
          this.state = { props }
        }
        componentDidMount() {
          if (callOnMount) {
            handler(this.props, this.props, true)
          }
        }
        static getDerivedStateFromProps(props, state) {
          if (shouldHandle(state.props, props)) {
            handler(props, state.props)
          }
          return { props }
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

export function delayedProp(options) {
  /*
  Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call if `options.mode` is `'debounce'` (default value), or calls `[name]` at most once every `[delayName]` milliseconds if `options.mode` is `'throttle'`.
  Renames undelayed `[name]` as `['onPush' + name]`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPushName = `onPush${capitalizedName}`,
    mode = 'debounce',
  } = name === options ? EMPTY_OBJECT : options
  const propNames = [name, delayName]
  const debouncer =
    mode === 'debounce' ? debounce : mode === 'throttle' ? throttle : null
  if (process.env.NODE_ENV !== 'production') {
    if (!debouncer) {
      throw new Error(`Unknown debounce mode supplied: "${mode}"`)
    }
  }
  return branch(
    hasProps(propNames),
    compose(
      withPropsOnChange(
        propNames,
        ({ [name]: callable, [delayName]: delay }) => ({
          [name]: debouncer(callable, delay),
          [onPushName]: callable,
        }),
      ),
    ),
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
      class editable extends BaseComponent {
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
      class synced extends BaseComponent {
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
            this.setState({
              value:
                onPull == null ? originalValue : onPull(originalValue, value),
            })
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

export function resilientProp(name) {
  /*
  Keeps the last non-`nil` value of prop `[name]`.
  */
  return (Component) =>
    setWrapperName(
      Component,
      class resiliant extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = { [name]: props[name] }
        }
        static getDerivedStateFromProps(props, state) {
          const value = props[name]
          return value === state.value || value == null ? null : { value }
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
