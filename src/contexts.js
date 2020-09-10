import { isString } from 'lodash'

import { $ } from './tools'

export function withContext(provider, propNameOrGetter = 'value') {
  /*
  Injects a context `provider` that takes its value from `[propName]`.
  */
  const getter = isString(propNameOrGetter)
    ? (props) => props[propNameOrGetter]
    : propNameOrGetter
  return (Component) =>
    function withContext(props) {
      return $(provider, { value: getter(props) }, $(Component, props))
    }
}

export function fromContext(consumer, propName = 'value') {
  /*
  Injects the value of the context `consumer` into `[propName]`.
  */
  return (Component) =>
    function fromContext(props) {
      return $(consumer, null, (value) =>
        $(Component, { ...props, [propName]: value }),
      )
    }
}
