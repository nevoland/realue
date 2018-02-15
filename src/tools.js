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
  debounce,
  every,
} from 'lodash'
import {
  lifecycle,
  withState,
  branch,
  compose,
  withHandlers,
  mapProps,
  withPropsOnChange,
} from 'recompose'

export const EMPTY_ARRAY = []
export const EMPTY_OBJECT = {}

export const hasProp = memoize(name => ({ [name]: prop }) => prop != null)

export const hasProps = names => props =>
  every(names, name => props[name] != null)

export function insert(array, value, index = array == null ? 0 : array.length) {
  return [...slice(array, 0, index), value, ...slice(array, index)]
}

export function replace(array, previousValue, value) {
  return replaceAt(array, indexOf(array, previousValue), value)
}

export function replaceAt(array, index, value) {
  return index === -1
    ? array == null ? EMPTY_ARRAY : array
    : [...slice(array, 0, index), value, ...slice(array, index + 1)]
}

export function set(object, key, value) {
  /*
  Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
  Note that if `value` is `undefined`, any value stored at `object[key]` is removed.
  */
  return object == null
    ? value === undefined ? EMPTY_OBJECT : { [key]: value }
    : value === undefined
      ? !(key in object) ? object : omit(object, key)
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

export function withBuffer(initialValue = pickValue) {
  return withState('buffer', 'setBuffer', initialValue)
}

withBuffer.omit = props => omit(props, ['buffer', 'setBuffer'])

export function withValue(name, initialValue) {
  return withState(name, `set${upperFirst(name)}`, initialValue)
}

export const withDebounce = branch(
  ({ delay }) => delay,
  compose(
    withPropsOnChange(['onChange', 'delay'], ({ onChange, delay }) => {
      const onChangeDebounced = debounce(onChange, delay)
      return {
        onChange: onChangeDebounced,
        flush: onChangeDebounced.flush,
      }
    }),
    withBuffer(),
    onPropsChange(['value'], ({ setBuffer, value }) => setBuffer(value), false),
    withHandlers({
      onChange: ({ onChange, setBuffer }) => (value, previousValue, event) => {
        event.persist()
        return setBuffer(value, () => onChange(value, previousValue, event))
      },
    }),
    mapProps(props => ({
      ...withBuffer.omit(props),
      value: props.buffer,
    })),
  ),
)

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
