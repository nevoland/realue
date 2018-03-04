import {
  compose,
  branch,
  withHandlers,
  mapProps,
  withPropsOnChange,
} from 'recompose'
import { debounce, omit } from 'lodash'

import { hasProp, withBuffer, onPropsChange, withPropertyBuffer } from './tools'

export const withDefaultValue = branch(
  props => 'defaultValue' in props,
  mapProps(props => {
    const { value, defaultValue = null } = props
    return {
      ...omit(props, 'defaultValue'),
      value: value === undefined ? defaultValue : value,
    }
  }),
)

export const value = branch(
  hasProp('onChange'),
  withHandlers({
    onChange: ({ value, name, onChange }) => payload =>
      onChange(value, name, payload),
  }),
)

export const buffered = branch(
  hasProp('onChange'),
  withPropertyBuffer(
    'value',
    withHandlers({
      onChange: ({ onChange, setBuffer }) => (value, name, payload) =>
        setBuffer(value, () => onChange(value, name, payload)),
    }),
  ),
)

export function filtered(condition, transform) {
  return branch(
    hasProp('onChange'),
    withPropertyBuffer(
      'value',
      withHandlers({
        onChange: props => (value, name, payload) =>
          props.setBuffer(value, () => {
            if (condition == null || condition(value, props, payload)) {
              return props.onChange(
                transform == null ? value : transform(value, props, payload),
                name,
                payload,
              )
            }
          }),
      }),
    ),
  )
}

export const debounced = branch(
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
