import { Component as BaseComponent } from 'react'

import { $, setWrapperName, getGlobal, isPromise } from './tools'

const { setTimeout, clearTimeout, setInterval, clearInterval } = getGlobal()

export class AbortError extends Error {
  /*
  Error to be thrown in case the query call is aborted.
  */
}

export function waitFor(duration, signal) {
  /*
  Returns a promise that resolves after at least `duration` milliseconds.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, duration)
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer)
        reject(new AbortError('Aborted'))
      })
    }
  })
}

function future(set, clear) {
  return (duration, callback) => {
    let done = false
    const timer = set(() => {
      done = true
      callback()
    }, duration)
    return () => {
      if (done) {
        return
      }
      clear(timer)
    }
  }
}

/*
Calls `callback` after at least `duration` milliseconds. Returns a function that cancels the future call of `callback`, if not already called.
*/
export const timeout = future(setTimeout, clearTimeout)

/*
Calls `callback` at least every `duration` milliseconds. Returns a function that stops future calls of `callback`.
*/
export const interval = future(setInterval, clearInterval)

function attachPromise(element, promise) {
  return promise.then(
    (value) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({ result: { done: true, error: null, value } })
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

function stateFromPromise(promise) {
  const done = !isPromise(promise)
  return {
    promise,
    result: {
      done,
      error: null,
      value: done ? promise : undefined,
    },
  }
}

export function promisedProp(name) {
  /*
  Replaces the promise at prop `[name]` with `{ done, error, value }`.
  Before the promise resolves, `done` is `false` and `value` is `undefined`.
  If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value amd `done` is `true`.
  If the propmise at prop `[name]` changes, `done`, `error`, and `value` are reset and any previous promise is discarded.
  */
  return (Component) =>
    setWrapperName(
      Component,
      class promised extends BaseComponent {
        constructor(props) {
          super(props)
          this.state = stateFromPromise(props[name])
          this.mounted = false
        }
        componentDidMount() {
          this.mounted = true
          const { state } = this
          if (!state.result.done) {
            attachPromise(this, state.promise)
          }
        }
        static getDerivedStateFromProps(props, state) {
          const promise = props[name]
          if (promise === state.promise) {
            return null
          }
          return stateFromPromise(promise)
        }
        componentDidUpdate(prevProps, prevState) {
          const { state } = this
          if (state.promise !== prevState.promise && !state.result.done) {
            attachPromise(this, state.promise)
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
