import { Component as BaseComponent } from 'react'
import { stubTrue } from 'lodash'

import { $, setWrapperName, getGlobal, isPromise } from './tools'

const {
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  requestAnimationFrame,
  cancelAnimationFrame,
} = getGlobal()

export class AbortError extends Error {
  /*
  Error to be thrown in case the query call is aborted.
  */
}

export function listenable(initialValue) {
  /*
  Returns a listenable value encapsulated in an object with the following properties:
  - `value`: the actual value
  - `on(listener)`: a `listener` registerer that returns an unregisterer for this function
  - `set(value)`: a new `value` setter that gets emitted to all registered listeners

  Example:

    const height = listenable(0)
    function log(value) {
      console.log(`Updated to ${value}`)
    }
    const off = height.on(log)
    // Returns 0
    height.value
    // Calls `log(300)`
    height.set(300)
    // Stops logging value changes
    off()
  */
  let value = initialValue
  const listeners = []
  return {
    get value() {
      return value
    },
    on(listener) {
      listeners.push(listener)
      return () => {
        listeners.splice(listeners.indexOf(listener), 1)
        return listeners.length
      }
    },
    set(newValue) {
      value = newValue
      const { length } = listeners
      for (let i = 0; i < length; i++) {
        listeners[i](newValue)
      }
      return length
    },
  }
}

export function on(target, event, listener, options) {
  /*
  Listens for `event` on `target`, calling `listener(event)` at each incoming `event`. The provided `options` are identical to those provided to `addEventListener`.
  Returns a function that removes the `listener` from the `target` for the specified `event`.
  If `listener` is not defined, returns a function that accepts the remaining `(listener, options)` arguments.
  */
  if (!listener) {
    return (listener, options) => on(target, event, listener, options)
  }
  target.addEventListener(event, listener, options)
  return () => target.removeEventListener(event, listener, options)
}

export function sleep(duration, signal) {
  /*
  Returns a promise that resolves after at least `duration` milliseconds.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  return new Promise((resolve, reject) => {
    const cancelTimer = timeout(duration, resolve)
    if (signal) {
      signal.addEventListener('abort', () => {
        cancelTimer()
        reject(new AbortError('Aborted'))
      })
    }
  })
}

export function until(register, signal, sentinel = stubTrue) {
  /*
  Listens for an event with the provided `register` function until `sentinel(event)` returns a truthy value.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  return new Promise((resolve, reject) => {
    const unregister = register((result) => {
      if (!sentinel(result)) {
        return
      }
      unregister()
      resolve(result)
    })
    if (signal) {
      signal.addEventListener('abort', () => {
        unregister()
        reject(new AbortError('Aborted'))
      })
    }
  })
}

export async function untilOnline(signal) {
  /*
  Returns a promise that waits for the browser to be back online.
  Resolves to `true` if it it was offline before calling this function, `false` otherwise.
  If a `signal` is provided, listens to it to cancel the promise.
  */
  const { navigator, window } = getGlobal()
  if (window && navigator && !navigator.onLine) {
    await until(on(window, 'online'), signal)
    return true
  }
  return false
}

const MAX_TIMEOUT = 2147483647

export function timeout(duration, callback) {
  /*
  Calls `callback` after at least `duration` milliseconds. Returns a function that cancels the future call of `callback`, if not already called.
  */
  if (!duration && requestAnimationFrame && cancelAnimationFrame) {
    const timer = requestAnimationFrame(callback)
    return () => {
      cancelAnimationFrame(timer)
    }
  }
  let timer = setTimeout(
    () => {
      timer = null
      callback()
    },
    duration > MAX_TIMEOUT ? MAX_TIMEOUT : duration,
  )
  return () => {
    if (timer == null) {
      return
    }
    clearTimeout(timer)
    timer = null
  }
}

export function interval(duration, callback) {
  /*
  Calls `callback` at least every `duration` milliseconds. Returns a function that stops future calls of `callback`. If `duration` is falsy, uses `requestAnimationFrame`.
  */
  if (!duration && requestAnimationFrame && cancelAnimationFrame) {
    let timer
    const update = () => {
      if (timer == null) {
        return
      }
      callback()
      timer = requestAnimationFrame(update)
    }
    timer = requestAnimationFrame(update)
    return () => {
      cancelAnimationFrame(timer)
      timer = null
    }
  }
  const timer = setInterval(
    callback,
    duration > MAX_TIMEOUT ? MAX_TIMEOUT : duration,
  )
  return () => {
    clearInterval(timer)
  }
}

function attachPromise(element, promise) {
  return promise.then(
    (value) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({ result: { done: true, error: undefined, value } })
    },
    (error) => {
      if (!element.mounted || element.state.promise !== promise) {
        return
      }
      element.setState({
        result: { done: true, error, value: undefined },
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
      error: undefined,
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
      class promisedProp extends BaseComponent {
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
