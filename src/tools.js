import {
  indexOf,
  slice,
  isFunction,
  omit,
  uniq,
  concat,
  keys,
  get,
  memoize,
  upperFirst,
  every,
  compact,
} from 'lodash'
import { lifecycle, withState, compose, mapProps } from 'recompose'

export const EMPTY_ARRAY = []
export const EMPTY_OBJECT = {}

export const hasProp = memoize(name => ({ [name]: prop }) => prop != null)

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
    ? array == null ? EMPTY_ARRAY : array
    : array == null
      ? value === undefined ? EMPTY_ARRAY : [value]
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
    ? object == null ? EMPTY_OBJECT : object
    : object == null
      ? value === undefined ? EMPTY_OBJECT : { [key]: value }
      : value === undefined
        ? key in object ? omit(object, key) : object
        : object[key] === value ? object : { ...object, [key]: value }
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

export function isValidDate(date) {
  return !isNaN(date.getTime())
}

export function pickValue({ value }) {
  return value
}

export function withPropertyBuffer(name = 'value', decorators = null) {
  return compose(
    ...compact([
      withState('buffer', 'setBuffer', ({ [name]: value }) => value),
      onPropsChange(
        [name],
        ({ [name]: value, buffer, setBuffer }) =>
          value !== buffer && setBuffer(value),
      ),
      decorators,
      mapProps(props => ({
        ...omit(props, ['buffer', 'setBuffer']),
        [name]: props.buffer,
      })),
    ]),
  )
}

export function withBuffer(initialValue = pickValue) {
  return withState('buffer', 'setBuffer', initialValue)
}

withBuffer.omit = props => omit(props, ['buffer', 'setBuffer'])

export function withValue(name, initialValue) {
  return withState(name, `set${upperFirst(name)}`, initialValue)
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
        handler(this.props)
      }
    },
    componentWillReceiveProps(nextProps) {
      if (shouldHandle(this.props, nextProps)) {
        handler(nextProps)
      }
    },
  })
}

export function promisify(result) {
  return result != null && isFunction(result.then) && isFunction(result.catch)
    ? result
    : Promise.resolve(result)
}

export function called(object, property) {
  object[property]()
  return object
}
