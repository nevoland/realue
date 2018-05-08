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
    default:
      return ({ onChange, name }) => event =>
        onChange(get(event, path), name, event)
  }
}

export const fromEvent = memoize(path => {
  return branch(
    hasProp('onChange'),
    withHandlers({ onChange: onChangeFromPath(path) }),
  )
})

export const withFocus = branch(
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
