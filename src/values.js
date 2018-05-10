import { createElement as $, PureComponent } from 'react'
import {
  compose,
  branch,
  withHandlers,
  withPropsOnChange,
  withProps,
} from 'recompose'

import {
  hasProp,
  hasProps,
  delayedProp,
  syncedProp,
  editableProp,
  cycledProp,
} from './tools'

export const defaultValue = branch(
  hasProp('defaultValue'),
  withProps(({ value, defaultValue }) => ({
    value: value === undefined ? defaultValue : value,
  })),
)

export const transformable = compose(
  /*
  Replaces `value` with the return value of `transformValue(value)`, if set.
  Replaces `value` passed to `onChange(value, name, payload)` with the return value of `transformOnChange(value, name, payload)`, if set.
  */
  branch(
    hasProp('transformValue'),
    withPropsOnChange(
      ['transformValue', 'value'],
      ({ transformValue, value }) => ({ value: transformValue(value) }),
    ),
  ),
  branch(
    hasProps(['onChange', 'transformOnChange']),
    withHandlers({
      onChange: ({ onChange, transformOnChange }) => (value, name, payload) =>
        onChange(transformOnChange(value, name, payload), name, payload),
    }),
  ),
)

export const filterable = compose(
  /*
  Prevents `value` update if `filterValue(value, previousValue)` is set and returns `false`.
  Prevents `onChange` call if `filterOnChange(value, name, payload)` is set and returns `false`.
  */
  branch(
    hasProp('filterValue'),
    Component =>
      class extends PureComponent {
        static getDerivedStateFromProps({ value, filterValue }, state) {
          return state &&
            (value === state.value || !filterValue(value, state.value))
            ? null
            : { value }
        }
        render() {
          return $(Component, {
            ...this.props,
            ...this.state,
          })
        }
      },
  ),
  branch(
    hasProps(['onChange', 'filterOnChange']),
    withHandlers({
      onChange: ({ filterOnChange, onChange }) => (value, name, payload) =>
        !filterOnChange(value, name, payload)
          ? null
          : onChange(value, name, payload),
      push: ({ onChange }) => onChange,
    }),
  ),
)

export const delayed = delayedProp({
  /*
  Delays `onChange` calls until after `delay` milliseconds have elapsed since the last call.
  Renames undelayed `onChange` as `push`.
  */
  name: 'onChange',
  delayName: 'delay',
  pushName: 'push',
})

export const editable = branch(
  /*
  Enables the `value` prop to be locally editable when `onChange` is set, while staying in sync with its parent value.
  The value can be updated with prop `onChange(value, name, payload)`, which triggers the parent prop `onChange`.
  Calling `pull()` sets the local value to the parent value.
  The return value of the optional parent prop `onPull(newValue, previousValue)` is used on `value` changes or when calling `pull()`.
  */
  hasProp('onChange'),
  compose(
    syncedProp({
      name: 'value',
      onChangeName: 'onChange',
      onPullName: 'onPull',
      pullName: 'pull',
    }),
    branch(
      hasProp('push'),
      withHandlers({
        push: ({ value, name, push }) => payload => push(value, name, payload),
      }),
    ),
  ),
)

export const cyclable = branch(
  hasProp('onChange'),
  cycledProp({
    name: 'value',
    valuesName: 'values',
    onChangeName: 'onChange',
    cycleName: 'cycle',
    nameName: 'name',
  }),
)

export const toggledEditing = branch(
  /*
  Sets the `editing` prop and enables its toggling through the `toggleEditing()` prop. 
  */
  hasProp('onChange'),
  compose(
    editableProp('editing'),
    cycledProp({ name: 'editing', cycleName: 'toggleEditing' }),
    withPropsOnChange(['editing'], ({ editing, onChange, push }) => ({
      onChange: editing ? onChange : null,
      push: editing ? onChange : push,
    })),
  ),
)
