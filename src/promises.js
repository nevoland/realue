import { AbortError } from './errors'

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
