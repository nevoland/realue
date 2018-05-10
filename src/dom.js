import { memoize, get } from 'lodash'
import { compose, branch, withHandlers } from 'recompose'

import { hasProp, syncedProp } from './tools'

function onChangeFromPath(path) {
  switch (path) {
    case 'target.value':
      return ({ onChange, name }) => event =>
        onChange(event.target.value, name, event)
    case 'target.checked':
      return ({ onChange, name }) => event =>
        onChange(event.target.checked, name, event)
    case undefined:
    case null:
      return ({ value, onChange, name }) => event =>
        onChange(value, name, event)
    default:
      return ({ onChange, name }) => event =>
        onChange(get(event, path), name, event)
  }
}

export const fromEvent = memoize(path => {
  /*
  Creates an `onChange` handler that takes the value from `get(event, path)`.
  If `path` is `nil`, the value is taken from the `value` prop instead.
  */
  return branch(
    hasProp('onChange'),
    withHandlers({ onChange: onChangeFromPath(path) }),
  )
})

export const syncedFocus = branch(
  /*
  Exposes the synced `focus` state of an element through the `onFocus()` and `onBlur()` callbacks.
  */
  hasProp('node'),
  compose(
    withHandlers({
      onPullFocus: ({ node }) => focus => {
        node[focus ? 'focus' : 'blur']()
        return focus
      },
    }),
    syncedProp('focus'),
    withHandlers({
      onFocus: ({ onChangeFocus }) => () => onChangeFocus(true),
      onBlur: ({ onChangeFocus }) => () => onChangeFocus(false),
    }),
  ),
)

export function onKeysDown(keys) {
  /*
  Triggers the specified `keys` handlers on key down. Each handler is called with the current `props`.
  */
  return withHandlers({
    onKeyDown: props => event => {
      const handler = keys[event.key]
      if (handler == null) {
        return
      }
      handler(props)
    },
  })
}
