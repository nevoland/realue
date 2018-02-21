import {
  compose,
  branch,
  withHandlers,
  mapProps,
  withPropsOnChange,
} from 'recompose'
import { debounce, omit } from 'lodash'

import { hasProp, withBuffer, onPropsChange } from './tools'

export const value = branch(
  hasProp('onChange'),
  withHandlers({
    onChange: ({ name, onChange }) => (value, payload) =>
      onChange(value, name, payload),
  }),
)

export const withDefaultValue = mapProps(props => {
  const { value, defaultValue = null } = props
  return {
    ...('defaultValue' in props ? omit(props, 'defaultValue') : props),
    value: value === undefined ? defaultValue : value,
  }
})

export function filterChange(condition, transform) {
  return branch(
    hasProp('onChange'),
    compose(
      withBuffer(),
      onPropsChange(['value'], ({ value, setBuffer }) => setBuffer(value)),
      withHandlers({
        onChange: props => (value, name, payload) =>
          props.setBuffer(value, () => {
            if (condition(value, props, payload)) {
              return props.onChange(
                transform == null ? value : transform(value, props, payload),
                name,
                payload,
              )
            }
          }),
      }),
      mapProps(props => ({ ...withBuffer.omit(props), value: props.buffer })),
    ),
  )
}

export const withDebounce = branch(
  ({ delay }) => delay,
  compose(
    withPropsOnChange(['onChange', 'delay'], ({ onChange, delay }) => {
      const onChangeDebounced = debounce(onChange, delay)
      return {
        onChange: onChangeDebounced,
        flush: onChangeDebounced.flush,
      }
    }),
    withBuffer(),
    onPropsChange(['value'], ({ setBuffer, value }) => setBuffer(value), false),
    withHandlers({
      onChange: ({ onChange, setBuffer }) => (value, name, event) => {
        event.persist()
        return setBuffer(value, () => onChange(value, name, event))
      },
    }),
    mapProps(props => ({
      ...withBuffer.omit(props),
      value: props.buffer,
    })),
  ),
)
