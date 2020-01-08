import { isString, upperFirst } from 'lodash'
import { compose, withPropsOnChange, withHandlers } from 'recompose'

import { EMPTY_OBJECT } from './immutables'
import { getGlobal } from './tools'

export function persistedProp(options) {
  /*
  Persists prop `[name]` in the storage found in prop `[storageName]`, optionally prepending the value found in `[domainName]` to the key when looking for the value. On mount, if the value is found in the storage, it is set to prop `[name]`. Its value is updated in the storage when `[onChangeName](value, name, payload)` is called.

  Example:

    const STORAGE = new Map()

    const PersistedInput = compose(
      withProps({ domain: 'persisted', storage: STORAGE }),
      persistedProp({ name: 'value', onChangeName: 'onChange' }),
      string,
      fromEvent('target.value'),
      domProps,
    )('input')
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    domainName = 'domain',
    storageName = 'storage',
  } = name === options ? EMPTY_OBJECT : options
  return compose(
    withPropsOnChange([name], (props) => {
      const {
        [name]: value,
        [domainName]: domain,
        [storageName]: storage,
      } = props
      return {
        [name]:
          value != null
            ? value
            : storage.get(domain ? `${domain}.${name}` : name),
      }
    }),
    withHandlers({
      [onChangeName]: (props) => (value, currentName, payload) => {
        const {
          [onChangeName]: onChange,
          [domainName]: domain,
          [storageName]: storage,
        } = props
        storage.set(domain ? `${domain}.${name}` : name, value)
        if (onChange) {
          onChange(value, currentName, payload)
        }
      },
    }),
  )
}

export const persisted = persistedProp({
  /*
  Persists prop `value` in the storage found in prop `storage`, optionally prepending the value found in `domain` to the key when looking for the value. On mount, if the value is found in the storage, it is set to prop `value`. Its value is updated in the storage when `onChange(value, name, payload)` is called.
  */
  name: 'value',
  onChangeName: 'onChange',
})

const DEFAULT_STORAGE = new Map()

function DOMStorage(type) {
  const { [type]: storage } = getGlobal()
  return storage
    ? {
        get(name) {
          try {
            const value = JSON.parse(storage.getItem(name))
            // Ensures compatibility with defaultProps()
            return value == null ? undefined : value
          } catch (error) {
            return undefined
          }
        },
        set(name, value) {
          const stringifiedValue = JSON.stringify(value)
          if (stringifiedValue == null) {
            storage.removeItem(name)
          } else {
            storage.setItem(name, JSON.stringify(value))
          }
        },
      }
    : DEFAULT_STORAGE
}

/*
Storage that persists between page reloads, until the tab or window is closed. To be used with `persistedProp()` or `persisted`.
*/
export const sessionStorage = DOMStorage('sessionStorage')

/*
Persistent storage. To be used with `persistedProp()` or `persisted`.
*/
export const localStorage = DOMStorage('localStorage')
