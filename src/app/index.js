import { createElement as $ } from 'react'
import { render } from 'react-dom'
import { map, isString } from 'lodash'
import {
  compose,
  pure,
  withState,
  withHandlers,
  withProps,
  defaultProps,
} from 'recompose'

import {
  array,
  boolean,
  creator,
  editor,
  number,
  object,
  removable,
  string,
  filtered,
  withDefaultValue,
  withFocus,
  withKeys,
  withValue,
} from '../'

const Text = compose(
  pure,
  string,
  defaultProps({
    defaultValue: '',
  }),
  withDefaultValue,
  withValue('node'),
  withFocus,
)(function Text({
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  setNode: ref,
  onKeyDown,
  className,
}) {
  return !onChange
    ? $('span', { className }, value)
    : $('input', {
        ref,
        value,
        placeholder,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        className,
      })
})

const Checkbox = compose(pure, boolean, withDefaultValue)(function Checkbox({
  value,
  onChange,
  label,
}) {
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
    value: {
      done: false,
    },
  }),
  creator,
  withValue('focus', true),
  withHandlers({
    save: ({ save, setFocus }) => event =>
      save(event).then(() => setFocus(true)),
  }),
  withKeys({
    Enter: ({ save }, event) => save(event),
  }),
  object,
)(function ItemCreator({
  value,
  save,
  cancel,
  property,
  focus,
  setFocus,
  onKeyDown,
}) {
  return $(
    'ul',
    null,
    $(Text, {
      ...property('label'),
      focus,
      onChangeFocus: setFocus,
      onKeyDown,
    }),
    $('button', { onClick: save, disabled: !value.label }, 'Add'),
    $('button', { onClick: cancel }, 'Cancel'),
  )
})

const EditedItems = compose(pure, editor)(function EditedItems({
  value,
  edit,
  onChange,
  save,
}) {
  return $(
    'div',
    null,
    $(Checkbox, {
      value: onChange != null,
      onChange: onChange == null ? edit : save,
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
  filtered(
    value => value === '' || !isString(value),
    value => (value === '' ? undefined : value),
  ),
  withDefaultValue,
  number,
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

export const App = compose(
  withState('value', 'onChange', {
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
  }),
  withHandlers({
    onChange: ({ onChange }) => value => onChange(value),
    printValue: ({ value }) => () =>
      // eslint-disable-next-line
      console.log('value', value),
  }),
  object,
)(function App(props) {
  const { property, printValue } = props
  return $(
    'div',
    null,
    $('h1', null, 'Realue'),
    $('h2', null, 'Todos'),
    $(EditedItems, property('todos')),
    $('h2', null, 'Color'),
    $(Color, property('color')),
    $('p', null, $('button', { onClick: printValue }, 'Print value')),
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
