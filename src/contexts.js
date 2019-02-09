import { createElement as $ } from 'react'

export function withContext(provider, propName) {
  /*
  Injects a context `provider` that takes its value from `[propName]`.
  */
  return (Component) =>
    function withContext(props) {
      return $(provider, { value: props[propName] }, $(Component, props))
    }
}

export function fromContext(consumer, propName) {
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
