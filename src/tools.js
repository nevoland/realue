import { createElement as $, PureComponent } from 'react'
import {
  concat,
  debounce,
  every,
  get,
  indexOf,
  isFunction,
  isString,
  keys,
  memoize,
  omit,
  slice,
  uniq,
  upperFirst,
} from 'lodash'
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

export const EMPTY_ARRAY = []
export const EMPTY_OBJECT = {}

export const hasProp = memoize(name => ({ [name]: prop }) => prop != null)

export const hasNotProp = memoize(name => ({ [name]: prop }) => prop == null)

export const hasProps = names => props =>
  every(names, name => props[name] != null)

export function insertItem(
  array,
  value,
  index = array == null ? 0 : array.length,
) {
  return array == null
    ? [value]
    : [...slice(array, 0, index), value, ...slice(array, index)]
}

export function replaceItem(array, previousValue, value) {
  return setItem(array, indexOf(array, previousValue), value)
}

export function setItem(array, index, value) {
  /*
  Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
  If `value` is `undefined`, ensures that the returned array does not contain the `index`.
  If `index` is greater than `array.length`, appends `value` to the `array`.
  If `index` equals `-1` or is `undefined`, returns the `array` untouched.
  */
  return index === -1 || index == null
    ? array == null
      ? EMPTY_ARRAY
      : array
    : array == null
      ? value === undefined
        ? EMPTY_ARRAY
        : [value]
      : value === undefined
        ? index < array.length
          ? [...slice(array, 0, index), ...slice(array, index + 1)]
          : array
        : array[index] === value
          ? array
          : [...slice(array, 0, index), value, ...slice(array, index + 1)]
}

export function setProperty(object, key, value) {
  /*
  Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
  If `value` is `undefined`, ensures that the returned object does not contain the `key`.
  If `key` is `undefined`, returns the `object` untouched.
  */
  return key === undefined
    ? object == null
      ? EMPTY_OBJECT
      : object
    : object == null
      ? value === undefined
        ? EMPTY_OBJECT
        : { [key]: value }
      : value === undefined
        ? key in object
          ? omit(object, key)
          : object
        : object[key] === value
          ? object
          : { ...object, [key]: value }
}

export function same(
  a,
  b,
  properties = uniq(concat(keys(a), keys(b))),
  deep = false,
) {
  /*
  Returns `true` if objects `a` and `b` have the same `properties`.
  Unless provided, `properties` are the combined set of property names from `a` and `b`.
  If `deep` is `true`, considers properties as paths (e.g., `p1.p2`).
  */
  const { length } = properties
  for (let i = 0; i < length; i++) {
    const property = properties[i]
    if (deep) {
      if (get(a, property) !== get(b, property)) {
        return false
      }
    } else {
      if (a[property] !== b[property]) {
        return false
      }
    }
  }
  return true
}

const REGEX_CHARS_PATTERN = /[.?*+^$[\]\\(){}|-]/g
export function escapeRegex(pattern) {
  return (pattern + '').replace(REGEX_CHARS_PATTERN, '\\$&')
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

export function logProps(propNames, name) {
  return Component =>
    onPropsChange(propNames, props => {
      /* eslint-disable no-console */
      console.group(name || Component.displayName || Component.name)
      for (let name of propNames) {
        console.log(name, props[name])
      }
      console.groupEnd()
      /* eslint-enable no-console */
    })(Component)
}

export function omitProps(keys) {
  return mapProps(props => omit(props, keys))
}

export function onPropsChange(shouldHandleOrKeys, handler, callOnMount = true) {
  /*
  Similar to `withPropsOnChange`, except that the values of the `handler` are not merged into the props.
  The `handler` is called when the component is first mounted if `callOnMount` is `true` (default value).
  */
  const shouldHandle = isFunction(shouldHandleOrKeys)
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
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    delayName = `delay${capitalizedName}`,
    pushName = `push${capitalizedName}`,
  } =
    name === options ? EMPTY_OBJECT : options
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
            [pushName]: callable,
          }
        },
      ),
    ),
  )
}

export function editableProp(options) {
  /*
  Enables a value prop of a given `name` to be locally editable.
  The value can be updated with `onChangeName`.
  */
  const name = isString(options) ? options : options.name
  const { onChangeName = `onChange${upperFirst(name)}` } =
    name === options ? EMPTY_OBJECT : options
  return Component =>
    class extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          value: props[name],
        }
        this.onChange = value => this.setState({ value })
      }
      render() {
        return $(Component, {
          ...this.props,
          [name]: this.state.value,
          [onChangeName]: this.onChange,
        })
      }
    }
}

export function syncedProp(options) {
  /*
  Enables a prop with a given `name` to be locally editable while staying in sync with its parent value.
  The prop can be updated with prop `[onChangeName](value, name, payload)`, which triggers the optional parent prop `[onChangeName]`.
  Calling `[pullName]()` sets the local value to the parent value.
  The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[pullName]()`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
    pullName = `pull${capitalizedName}`,
  } =
    name === options ? EMPTY_OBJECT : options
  return Component =>
    class extends PureComponent {
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
            onChange == null ? undefined : () => onChange(value, name, payload),
          )
        }
        this.pull = () => {
          const {
            props: { onPull },
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
          [pullName]: this.pull,
        })
      }
    }
}

export function cycledProp(options) {
  /*
  Injects prop `[cycleName](payload)` that cycles the value of prop `[name]` through the values found in prop `[valuesName]` which default to `[false, true]`.
  Calls `[onChangeName](value, name, payload)` with `name` taken from prop `[nameName]` or `name`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    valuesName = `${name}Values`,
    cycleName = `cycle${capitalizedName}`,
    onChangeName = `onChange${capitalizedName}`,
    nameName = `${name}Name`,
  } =
    name === options ? EMPTY_OBJECT : options
  return withHandlers({
    [cycleName]: ({
      [name]: value,
      [valuesName]: values = [false, true],
      [onChangeName]: onChange,
      [nameName]: valueName = name,
    }) => payload => {
      const index = indexOf(values, value) + 1
      onChange(values[index === values.length ? 0 : index], valueName, payload)
    },
  })
}
