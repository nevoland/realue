import { createElement as $ } from 'react'
import { render } from 'react-dom'
import { map, isString, stubFalse } from 'lodash'
import {
  compose,
  pure,
  withHandlers,
  withProps,
  defaultProps,
  renameProp,
} from 'recompose'

import {
  array,
  boolean,
  cyclable,
  defaultValue,
  delayed,
  editable,
  editableProp,
  filterable,
  fromEvent,
  number,
  object,
  omitProps,
  onKeysDown,
  onPropsChange,
  removable,
  string,
  toggledEditing,
  transformable,
  withFocus,
} from '../'

const Text = compose(
  pure,
  defaultProps({ defaultValue: '', focus: false }),
  defaultValue,
  string,
  fromEvent('target.value'),
  editableProp('node'),
  withFocus,
)(function Text({
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  onChangeNode,
  onKeyDown,
  className,
}) {
  return !onChange
    ? $('span', { className }, value)
    : $('input', {
        ref: onChangeNode,
        value,
        placeholder,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        className,
      })
})

const Checkbox = compose(
  pure,
  defaultValue,
  boolean,
  fromEvent('target.checked'),
)(function Checkbox({ value, onChange, label }) {
  return $(
    'label',
    null,
    $('input', {
      type: 'checkbox',
      checked: value,
      onChange,
      disabled: !onChange,
    }),
    label == null ? null : $('span', null, ' ', label),
  )
})

const Item = compose(pure, object, removable)(function Item({
  property,
  remove,
}) {
  return $(
    'li',
    null,
    $(Checkbox, { ...property('done'), defaultValue: false }),
    ' ',
    $(Text, {
      ...property('label'),
      placeholder: 'Untitled item',
    }),
    remove && $('button', { onClick: remove }, 'Remove'),
  )
})

const Items = compose(pure, array)(function Items({ value, item, onAdd }) {
  return $(
    'div',
    null,
    $('ul', null, map(value, (value, index) => $(Item, item(index)))),
    onAdd && $(ItemCreator, { onChange: onAdd, name: value.length }),
  )
})

const ItemCreator = compose(
  pure,
  withProps({
    value: { done: false },
    filterOnChange: stubFalse,
    focus: true,
  }),
  editableProp('focus'),
  filterable,
  editable,
  withHandlers({
    push: ({ push, pull, onChangeFocus }) => () => {
      push()
      pull()
      onChangeFocus(true)
    },
  }),
  onKeysDown({
    Enter: ({ push }) => push(),
  }),
  object,
)(function ItemCreator({
  value,
  push,
  cancel,
  property,
  focus,
  onChangeFocus,
  onKeyDown,
}) {
  return $(
    'ul',
    null,
    $(Text, {
      ...property('label'),
      focus,
      onChangeFocus,
      onKeyDown,
    }),
    $('button', { onClick: push, disabled: !value.label }, 'Add'),
    $('button', { onClick: cancel }, 'Cancel'),
  )
})

const EditedItems = compose(
  pure,
  withProps({ filterOnChange: stubFalse, editing: false }),
  toggledEditing,
  filterable,
  editable,
  withHandlers({
    toggleEditing: ({ push, editing, toggleEditing }) => payload => {
      if (editing) {
        push(payload)
      }
      toggleEditing()
    },
  }),
)(function EditedItems({ value, onChange, editing, toggleEditing }) {
  return $(
    'div',
    null,
    $(Checkbox, {
      value: editing,
      onChange: toggleEditing,
      label: 'Edit',
    }),
    $(Items, { value, onChange }),
  )
})

const Color = compose(pure, object)(function Color({ property, value }) {
  return $(
    'ul',
    null,
    $('div', {
      style: {
        width: 30,
        height: 30,
        backgroundColor: `rgb(${value.r || 0},${value.g || 0},${value.b || 0})`,
      },
    }),
    map(['r', 'g', 'b'], name =>
      $(ColorProperty, {
        ...property(name, name),
        type: 'number',
        min: 0,
        max: 255,
      }),
    ),
  )
})

const Number = compose(
  pure,
  defaultProps({
    type: 'number',
    defaultValue: '',
    placeholder: '0',
  }),
  withProps({
    transformOnChange: value => (value === '' ? undefined : value),
    filterOnChange: value => value === '' || !isString(value),
  }),
  transformable,
  filterable,
  editable,
  defaultValue,
  number,
  fromEvent('target.value'),
  omitProps([
    'transformOnChange',
    'filterOnChange',
    'defaultValue',
    'pull',
    'push',
  ]),
)('input')

const ColorProperty = compose(pure)(function ColorProperty({
  value,
  name,
  onChange,
  min,
  max,
}) {
  return $(
    'li',
    null,
    name,
    ': ',
    $(Number, { value, name, onChange, min, max }),
    $(Number, {
      value,
      defaultValue: 0,
      type: 'range',
      name,
      onChange,
      min,
      max,
    }),
  )
})

export const Toggle = compose(
  pure,
  delayed,
  onPropsChange(
    ['value'],
    ({ value, onChange, name }) => value && onChange && onChange(false, name),
  ),
  renameProp('push', 'onChange'),
  cyclable,
)(function Toggle({ value, cycle }) {
  return $(
    'div',
    null,
    $('button', { onClick: cycle }, 'Toggle'),
    $('p', null, value ? 'ON' : 'OFF'),
  )
})

export const App = compose(
  withProps({
    value: {
      todos: [
        { done: false, label: 'eye' },
        { done: false, label: 'touch' },
        { done: false, label: 'ear' },
      ],
      color: {
        r: 0,
        g: 0,
        b: 0,
      },
      toggle: false,
    },
    delay: 1000,
    // eslint-disable-next-line no-console
    onChange: value => console.log('value', value),
  }),
  delayed,
  editable,
  object,
)(function App(props) {
  const { property } = props
  return $(
    'div',
    null,
    $('h1', null, 'Realue'),
    $('h2', null, 'Todos'),
    $(EditedItems, property('todos')),
    $('h2', null, 'Color'),
    $(Color, property('color')),
    $('h2', null, 'Delayed'),
    $(Toggle, { ...property('toggle'), delay: 2000 }),
  )
})

/* istanbul ignore next */
function start(App) {
  render($(App), global.document.getElementById('main'))
}

/* istanbul ignore next */
if (global.window) {
  start(App)
}

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept(function() {
    start(App)
  })
}
