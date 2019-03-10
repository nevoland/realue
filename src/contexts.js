import { $ } from './tools'

export function withContext(provider, propName = 'value') {
  /*
  Injects a context `provider` that takes its value from `[propName]`.
  */
  return (Component) =>
    function withContext(props) {
      return $(provider, { value: props[propName] }, $(Component, props))
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
