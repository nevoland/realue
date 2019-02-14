import { createElement as $, Component as BaseComponent } from 'react'
import { keys, omit, isString, upperFirst, debounce, indexOf } from 'lodash'
import {
  mapProps,
  lifecycle,
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

export function onPropsChange(shouldHandleOrKeys, handler, callOnMount = true) {
  /*
  Similar to `withPropsOnChange`, except that the values of the `handler` are not merged into the props.
  The `handler` is called when the component is first mounted if `callOnMount` is `true` (default value).
  */
  const shouldHandle =
    typeof shouldHandleOrKeys === 'function'
      ? shouldHandleOrKeys
      : (props, nextProps) => !same(props, nextProps, shouldHandleOrKeys)
  return lifecycle({
    componentWillMount() {
      if (callOnMount) {
        handler(this.props, this.props)
      }
    },
    componentWillReceiveProps(nextProps) {
      if (shouldHandle(this.props, nextProps)) {
        handler(nextProps, this.props)
      }
    },
  })
}

export function delayedProp(options) {
  /*
  Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call.
  Renames undelayed `[name]` as `onPushName`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    onPushName = `onPush${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  const propNames = [name, delayName]
  return branch(
    hasProps(propNames),
    compose(
      withPropsOnChange(
        propNames,
        ({ [name]: callable, [delayName]: delay }) => {
          const debouncedCallable = debounce(callable, delay)
          return {
            [name]: debouncedCallable,
            [onPushName]: callable,
          }
        },
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
          this.state = this.constructor.getDerivedStateFromProps(
            props,
            EMPTY_OBJECT,
          )
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
          if (value === state.originalValue && state !== EMPTY_OBJECT) {
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
