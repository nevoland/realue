import { createElement as $ } from 'react'
import { render } from 'react-dom'
import { map } from 'lodash'
import { compose, pure, withState, withHandlers, withProps } from 'recompose'

import {
  array,
  object,
  string,
  boolean,
  editor,
  creator,
  withValue,
  withKeys,
  withFocus,
} from '../'

const Text = compose(pure, string, withValue('node'), withFocus)(function Text({
  value,
  onChange,
  onFocus,
  onBlur,
  setNode: ref,
  onKeyDown,
}) {
  return !onChange
    ? $('span', null, value)
    : $('input', {
        ref,
        value,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
      })
})

const Checkbox = compose(pure, boolean)(function Checkbox({
  value,
  onEvent: onChange,
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

const Item = compose(pure, object)(function Item({
  value,
  property,
  onRemove,
}) {
  return $(
    'li',
    null,
    $(Checkbox, property('done')),
    ' ',
    $(Text, property('label')),
    onRemove &&
      $('button', { onClick: event => onRemove(value, event) }, 'Remove'),
  )
})

const Items = compose(pure, array)(function Items({ value, item, onAdd }) {
  return $(
    'div',
    null,
    $('ul', null, map(value, (value, key) => $(Item, item(value, key)))),
    onAdd && $(ItemCreator, { onChange: onAdd }),
  )
})

const ItemCreator = compose(
  pure,
  withProps({
    value: {
      label: '',
      done: false,
    },
  }),
  creator,
  withValue('focus', true),
  withKeys({
    Enter: ({ save }, event) => save(event),
  }),
  withHandlers({
    save: ({ save, setFocus }) => event =>
      save(event).then(() => setFocus(true)),
  }),
  object,
)(function ItemCreator({ save, cancel, property, focus, setFocus, onKeyDown }) {
  return $(
    'ul',
    null,
    $(Text, {
      ...property('label'),
      focus,
      onChangeFocus: setFocus,
      onKeyDown,
    }),
    $('button', { onClick: save }, 'Add'),
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

export const App = compose(
  withState('value', 'onChange', [
    { done: false, label: 'eye' },
    { done: false, label: 'touch' },
    { done: false, label: 'ear' },
  ]),
  withHandlers({
    onChange: ({ onChange }) => value => onChange(value),
    printValue: ({ value }) => () =>
      // eslint-disable-next-line
      console.log('value', value),
  }),
)(function App(props) {
  const { value, onChange, printValue } = props
  return $(
    'div',
    null,
    $('h1', null, 'Realue'),
    $(EditedItems, { value, onChange }),
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
