import { compose, branch, withHandlers, mapProps } from 'recompose'

import { onPropsChange, withBuffer, hasProp } from './tools'

export const withFocus = branch(
  hasProp('node'),
  compose(
    withBuffer(({ focused }) => (focused == null ? false : !focused)),
    withHandlers({
      onFocus: ({ buffer, setBuffer, onChangeFocus }) => () =>
        buffer
          ? undefined
          : setBuffer(
              true,
              onChangeFocus == null ? undefined : () => onChangeFocus(true),
            ),
      onBlur: ({ buffer, setBuffer, onChangeFocus }) => () =>
        !buffer
          ? undefined
          : setBuffer(
              false,
              onChangeFocus == null ? undefined : () => onChangeFocus(false),
            ),
    }),
    onPropsChange(['node', 'focused'], props => {
      const { node, focused, buffer } = props
      if (node == null || focused == null || focused === buffer) {
        return
      }
      node[focused ? 'focus' : 'blur']()
    }),
    mapProps(props => ({ ...withBuffer.omit(props), focused: props.buffer })),
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
