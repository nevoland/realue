import { createElement as $, Component as BaseComponent } from 'react'
import { compose, branch, withHandlers, withPropsOnChange } from 'recompose'
import { memoize, get } from 'lodash'

import {
  hasProp,
  hasProps,
  delayedProp,
  syncedProp,
  editableProp,
  cycledProp,
  promisedProp,
} from './tools'

export const defaultValue = Component =>
  /*
  Sets `value` to `defaultValue` if `value` is `nil`.
  */
  function defaultValue(props) {
    const { defaultValue, value } = props
    return $(Component, {
      ...props,
      value:
        defaultValue == null ? value : value == null ? defaultValue : value,
    })
  }

export const transformable = compose(
  /*
  Replaces `value` with the return value of `transformValue(value, previous?: { transformedValue, value })`, if set. Note that `previous` is not provided when the component first mounts, since there are no previous prop values.
  Replaces `value` passed to `onChange(value, name, payload)` with the return value of `transformOnChange(value, name, payload)`, if set.
  */
  branch(
    hasProp('transformValue'),
    Component =>
      class transformable extends BaseComponent {
        static getDerivedStateFromProps({ value, transformValue }, state) {
          return state && value === state.value
            ? null
            : {
                transformedValue: transformValue(value, state),
                value,
              }
        }
        render() {
          return $(Component, {
            ...this.props,
            value: this.state.transformedValue,
          })
        }
      },
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
  Prevents `onChange` call if `filterOnChange(value, name, payload)` is set and returns `false`. Using `onPush` calls `onChange` unconditionally.
  */
  branch(
    hasProp('filterValue'),
    Component =>
      class filterable extends BaseComponent {
        static getDerivedStateFromProps({ value, filterValue }, state) {
          return state &&
            (value === state.value || !filterValue(value, state.value))
            ? null
            : { value }
        }
        render() {
          return $(Component, {
            ...this.props,
            value: this.state.value,
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
      onPush: ({ onChange }) => onChange,
    }),
  ),
)

export const delayable = delayedProp({
  /*
  Delays `onChange` calls until after `delay` milliseconds have elapsed since the last call.
  Renames undelayed `onChange` as `onPush`.
  */
  name: 'onChange',
  delayName: 'delay',
  onPushName: 'onPush',
})

export const editable = branch(
  /*
  Enables the `value` prop to be locally editable when `onChange` is set, while staying in sync with its parent value.
  The value can be updated with prop `onChange(value, name, payload)`, which triggers the parent prop `onChange`.
  Calling `onPull()` sets the local value to the parent value.
  The return value of the optional parent prop `onPull(newValue, previousValue)` is used on `value` changes or when calling `onPull()`.
  */
  hasProp('onChange'),
  compose(
    syncedProp({
      name: 'value',
      onChangeName: 'onChange',
      onPullName: 'onPull',
    }),
    branch(
      hasProp('onPush'),
      withHandlers({
        onPush: ({ value, name, onPush }) => payload =>
          onPush(value, name, payload),
      }),
    ),
  ),
)

export const cyclable = branch(
  /*
  Injects prop `onCycle(payload)` that cycles the `value` prop through the values of `values` prop, which default to `[false, true]`. Calls `onChange(value, name, payload)`.
  */
  hasProp('onChange'),
  cycledProp({
    name: 'value',
    valuesName: 'values',
    onChangeName: 'onChange',
    onCycleName: 'onCycle',
    nameName: 'name',
  }),
)

export const promised = promisedProp('value')

export const toggledEditing = branch(
  /*
  Sets the `editing` prop and enables its toggling through the `onToggleEditing()` prop. 
  */
  hasProp('onChange'),
  compose(
    editableProp('editing'),
    cycledProp({ name: 'editing', onCycleName: 'onToggleEditing' }),
    withPropsOnChange(['editing'], ({ editing, onChange, onPush }) => ({
      onChange: editing ? onChange : null,
      onPush: editing ? onChange : onPush,
    })),
  ),
)

function onChangeFromPath(path) {
  switch (path) {
    case undefined:
    case null:
      return ({ onChange, name }) => value => onChange(value, name)
    default:
      return ({ onChange, name }) => value => onChange(get(value, path), name)
  }
}

export const fromValue = memoize(path => {
  /*
  Adapts `onChange` for components that call it by providing the `value` as a first argument. If the `path` is not `nil`, extracts the value from `get(value, path)`.

  Example:

    function Trigger({ onChange }) {
      return <button onClick={() => onChange(true)}>Enable</button>
    }

    // `AdaptedTrigger` calls `onChange` with `onChange(true, name)`
    const AdaptedTrigger = fromValue(Trigger)
  */
  return branch(
    hasProp('onChange'),
    withHandlers({ onChange: onChangeFromPath(path) }),
  )
})
