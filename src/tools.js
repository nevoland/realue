import { createElement as $, Component as BaseComponent } from 'react'
import {
  concat,
  debounce,
  every,
  get,
  indexOf,
  isString,
  keys,
  memoize,
  omit,
  slice,
  uniq,
  upperFirst,
  map,
  identity,
  mapValues,
} from 'lodash'
import {
  branch,
  compose,
  lifecycle,
  mapProps,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

/*
Empty array to be used in immutable values. Using this instead of `[]` avoids having several instances of immutable empty arrays.
*/
export const EMPTY_ARRAY = []

/*
Empty object to be used in immutable values. Using this instead of `{}` avoids having several instances of immutable empty objects.
*/
export const EMPTY_OBJECT = {}

/*
Returns a function that checks if `props[name]` is not `nil`.
*/
export const hasProp = memoize(name => ({ [name]: prop }) => prop != null)

/*
Returns a function that checks if `props[name]` is `nil`.
*/
export const hasNotProp = memoize(name => ({ [name]: prop }) => prop == null)

/*
Returns a function that checks if every prop `name` in `names` is not `nil`.
*/
export const hasProps = names => props =>
  every(names, name => props[name] != null)

export function insertItem(
  array,
  value,
  index = array == null ? 0 : array.length,
) {
  /*
  Returns a new array with the `value` inserted into the `array` at the provided `index`, provided `value` is not `undefined`, in which case the `array` is returned untouched.
  If the `index` is not provided, the `value` appended to the `array`.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return array == null
    ? value === undefined
      ? EMPTY_ARRAY
      : [value]
    : value === undefined
    ? array
    : [...slice(array, 0, index), value, ...slice(array, index)]
}

export function insertItems(
  array,
  value,
  index = array == null ? 0 : array.length,
) {
  /*
  Returns a new array with the `value` array merged into the `array` at the provided `index`, provided `value` is not `nil`, in which case the `array` is returned untouched.
  If the `index` is not provided, the `value` array is appended to the `array`.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return array == null
    ? value == null
      ? EMPTY_ARRAY
      : value
    : value == null
    ? array
    : [...slice(array, 0, index), ...value, ...slice(array, index)]
}

export function replaceItem(array, previousValue, value) {
  /*
  Returns a new array with the first occurence of the `previousValue` in `array` replaced by `value`.
  Returns the same `array` if the `previousValue` is not found.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
  */
  return setItem(array, indexOf(array, previousValue), value)
}

export function setItem(array, index, value) {
  /*
  Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
  If `value` is `undefined`, ensures that the returned array does not contain the item found at `index`.
  If `index` is greater than `array.length`, appends `value` to the `array`.
  If `index` equals `-1` or is `undefined`, returns the `array` untouched.
  If the `array` is `nil`, it is considered as an `EMPTY_ARRAY`.
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
  If `object` is `nil`, it is considered as an `EMPTY_OBJECT`.
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

export function logProps(propNames, title) {
  /*
  Logs the provided `propNames` whenever they change.
  The `title` defaults to the component name.
  If `propNames` is `nil`, logs all props.
  */
  return Component =>
    onPropsChange(propNames || undefined, props => {
      /* eslint-disable no-console */
      console.group(title || Component.displayName || Component.name)
      for (let name of propNames || keys(props)) {
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
  return mapProps(props => omit(props, propNames))
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
  return Component =>
    class editable extends BaseComponent {
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
  Calling `[onPullName]()` sets the local value to the parent value.
  The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[onPullName]()`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    onPullName = `onPull${capitalizedName}`,
  } = name === options ? EMPTY_OBJECT : options
  return Component =>
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
            onChange == null ? undefined : () => onChange(value, name, payload),
          )
        }
        this.onPull = () => {
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
          [onPullName]: this.onPull,
        })
      }
    }
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
    }) => payload => {
      const index = indexOf(values, value) + 1
      onChange(values[index === values.length ? 0 : index], valueName, payload)
    },
  })
}

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
  Builds an array that maps every item from the `[valueName]` prop with the result of `<Component {...childProps(props)(itemValue, itemIndex)}` and injects it as a `[destination]` prop.
  The prop is only updated if `shouldUpdateOrKeys` returns `true` or if a prop whose name is listed in it changes.

  Example:

    function Item({ value }) {
      return $('li', null, value)
    }
    const List = withChildren(Item, () => value => ({ value }))('ul')
  */
  return withPropsOnChange(shouldUpdateOrKeys, props => ({
    [destination]: map(
      props[valueName],
      (childProps => (value, index) =>
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
  Builds an element from the provided `Component` with the props from `childProps(props)` and injects it as a `[destination]` prop.
  The prop is only updated if `shouldUpdateOrKeys` returns `true` or if a prop whose name is listed in it changes.
  */
  if (typeof Component === 'function') {
    return withPropsOnChange(shouldUpdateOrKeys, props => ({
      [destination]: $(Component, childProps(props, null)),
    }))
  }
  return withPropsOnChange(shouldUpdateOrKeys, props => ({
    [destination]: mapValues(Component, (Component, name) =>
      $(Component, childProps(props, name)),
    ),
  }))
}

export const withElement = withChild

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

export function promisedProp(name) {
  /*
  Replaces the promise at prop `[name]` with `{ done, error, value }`.
  Before the promise resolves, `done` is `false`, and becomes `true` afterwards.
  If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value.
  If the propmise at prop `[name]` changes, `done`, `error`, and `value` are reset and any previous promise is discarded.
  */
  return Component =>
    class promised extends BaseComponent {
      constructor(props) {
        super(props)
        this.state = this.constructor.getDerivedStateFromProps(
          props,
          EMPTY_OBJECT,
        )
        this.mounted = false
      }

      attachPromise(promise) {
        if (promise == null) {
          return
        }
        return Promise.resolve(promise).then(
          value => {
            if (!this.mounted || this.state.promise !== promise) {
              return
            }
            this.setState({ result: { done: true, error: null, value } })
          },
          error => {
            if (!this.mounted || this.state.promise !== promise) {
              return
            }
            this.setState({
              result: { done: true, error, value: null },
            })
          },
        )
      }

      componentDidMount() {
        this.mounted = true
        this.attachPromise(this.state.promise)
      }

      static getDerivedStateFromProps(props, state) {
        const promise = props[name]
        if (promise === state.promise && state !== EMPTY_OBJECT) {
          return null
        }
        return {
          promise,
          result: {
            done: false,
            error: null,
            value: null,
          },
        }
      }

      componentDidUpdate(prevProps, prevState) {
        const { promise } = this.state
        if (promise !== prevState.promise) {
          this.attachPromise(promise)
        }
      }

      componentWillUnmount() {
        this.mounted = false
      }

      render() {
        return $(Component, {
          ...this.props,
          [name]: this.state.result,
        })
      }
    }
}

export function resilientProp(name) {
  /*
  Keeps the last non-`nil` value of prop `[name]`.
  */
  return Component =>
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
    }
}
