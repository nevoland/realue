import { compose, branch, withHandlers, mapProps } from 'recompose'

import { onPropsChange, hasProps, withBuffer } from './tools'

export const withFocus = compose(
  branch(
    hasProps(['focus', 'node', 'onChangeFocus']),
    compose(
      withBuffer(({ focus }) => !focus),
      withHandlers({
        onFocus: ({ buffer, setBuffer, onChangeFocus }) => () =>
          buffer ? undefined : setBuffer(true, () => onChangeFocus(true)),
        onBlur: ({ buffer, setBuffer, onChangeFocus }) => () =>
          !buffer ? undefined : setBuffer(false, () => onChangeFocus(false)),
      }),
      onPropsChange(['node', 'focus'], props => {
        const { node, focus, buffer } = props
        if (node == null || focus === buffer) {
          return
        }
        node[focus ? 'focus' : 'blur']()
      }),
      mapProps(props => withBuffer.omit(props)),
    ),
  ),
)

export function withKeys(keys) {
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
