import { createElement as $, Component as BaseComponent } from 'react'

import { EMPTY_OBJECT } from './immutables'
import { AbortError } from './errors'
import { setWrapperName } from './tools'

/*
Returns a promise that resolves after at least `duration` milliseconds.
If a `signal` is provided, listens to it to reject 
*/
export const waitFor = (duration, signal) =>
  new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, duration)
    if (signal) {
      signal.addEventListener('abort', () => {
        window.clearTimeout(timer)
        reject(new AbortError('Aborted'))
      })
    }
  })

function attachPromise(element, promise) {
  if (promise == null) {
    return
  }
  return Promise.resolve(promise).then(
    (value) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({
        result: { done: true, error: null, value },
      })
    },
    (error) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({
        result: { done: true, error, value: null },
      })
    },
  )
}

export function promisedProp(name) {
  /*
  Replaces the promise at prop `[name]` with `{ done, error, value }`.
  Before the promise resolves, `done` is `false`, and becomes `true` afterwards.
  If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value.
  If the propmise at prop `[name]` changes, `done`, `error`, and `value` are reset and any previous promise is discarded.
  */
  return (Component) =>
    setWrapperName(
      Component,
      class promised extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = this.constructor.getDerivedStateFromProps(
            props,
            EMPTY_OBJECT,
          )
          this.mounted = false
        }
        componentDidMount() {
          this.mounted = true
          attachPromise(this, this.state.promise)
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
            attachPromise(this, promise)
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
      },
    )
}
