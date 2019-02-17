import { createElement as $ } from 'react'
import { render } from 'react-dom'
import {
  map,
  isString,
  stubFalse,
  times,
  constant,
  get,
  last,
  uniqBy,
  upperFirst,
  reverse,
  slice,
} from 'lodash'
import {
  compose,
  pure,
  withHandlers,
  withProps,
  defaultProps,
  renameProp,
  flattenProp,
  withPropsOnChange,
} from 'recompose'

import {
  array,
  boolean,
  cyclable,
  defaultValue,
  delayable,
  editable,
  editableProp,
  EMPTY_OBJECT,
  EMPTY_ARRAY,
  filterable,
  fromEvent,
  logProps,
  number,
  object,
  omitProps,
  onKeysDown,
  onPropsChange,
  parseNumber,
  queried,
  refreshed,
  removable,
  resilient,
  string,
  syncedFocus,
  toggledEditing,
  transformable,
  withChild,
  withArrayChildren,
  syncedProp,
  withObjectChildren,
} from '../../src'

import { request } from './requests'

const Text = compose(
  pure,
  defaultProps({ defaultValue: '', focus: false }),
  defaultValue,
  string,
  fromEvent('target.value'),
  editableProp('node'),
  syncedFocus,
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

const Item = compose(
  pure,
  object,
  removable,
)(function Item({ property, onRemove }) {
  return $(
    'li',
    null,
    $(Checkbox, { ...property('done'), defaultValue: false }),
    ' ',
    $(Text, {
      ...property('label'),
      placeholder: 'Untitled item',
    }),
    onRemove && $('button', { onClick: onRemove }, 'Remove'),
  )
})

const ITEMS = times(3, constant(EMPTY_OBJECT))

const Items = compose(
  pure,
  array,
  withArrayChildren(Item),
  withHandlers({
    onAddThree: ({ value, onAddItems }) => (payload) =>
      onAddItems(ITEMS, value.length, payload),
  }),
)(function Items({ value, children, onAddItem, onAddThree }) {
  return $(
    'div',
    null,
    $('ul', null, children),
    onAddItem &&
      $(ItemCreator, { onChange: onAddItem, onAddThree, name: value.length }),
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
    onPush: ({ onPush, onPull, onChangeFocus }) => () => {
      onPush()
      onPull()
      onChangeFocus(true)
    },
  }),
  onKeysDown({
    Enter: ({ onPush }) => onPush(),
    Escape: ({ onPull, onChangeFocus }) => {
      onPull()
      onChangeFocus(false)
    },
  }),
  object,
)(function ItemCreator({
  value,
  onPush,
  onPull,
  onAddThree,
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
    $('button', { onClick: onPush, disabled: !value.label }, 'Add'),
    $('button', { onClick: onPull }, 'Cancel'),
    $('button', { onClick: onAddThree }, 'Add 3'),
  )
})

const EditedItems = compose(
  pure,
  withProps({ filterOnChange: stubFalse, editing: false }),
  toggledEditing,
  filterable,
  editable,
  withHandlers({
    onToggleEditing: ({ onPush, editing, onToggleEditing }) => (payload) => {
      if (editing) {
        onPush(payload)
      }
      onToggleEditing()
    },
  }),
  withChild(Items),
)(function EditedItems({ children, editing, onToggleEditing }) {
  return $(
    'div',
    null,
    $(Checkbox, {
      value: editing,
      onChange: onToggleEditing,
      label: 'Edit',
    }),
    children,
  )
})

const Color = compose(
  pure,
  object,
)(function Color({ property, value }) {
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
    map(['r', 'g', 'b'], (name) =>
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
    transformOnChange: (value) =>
      value === '' ? undefined : parseNumber(value),
    filterOnChange: (value) => value === '' || !isString(parseNumber(value)),
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
    'onPull',
    'onPush',
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
  delayable,
  onPropsChange(
    ['value'],
    ({ value, onChange, name }) => value && onChange && onChange(false, name),
  ),
  renameProp('onPush', 'onChange'),
  cyclable,
  logProps(),
)(function Toggle({ value, onCycle }) {
  return $(
    'div',
    null,
    $(
      'p',
      null,
      'Clicking this button will switch the value to "ON" for 2 seconds only.',
    ),
    $('button', { onClick: onCycle }, 'Toggle'),
    $('p', null, value ? 'ON' : 'OFF'),
  )
})

const Article = withObjectChildren({
  header: [
    'h1',
    ['value'],
    ({ value }, name) => ({
      children: value[name],
    }),
  ],
  body: ['p', ['value'], ({ value }, name) => ({ children: value[name] })],
})(({ children = EMPTY_OBJECT }) =>
  $(
    'div',
    null,
    $('div', null, children.header),
    $('div', null, children.body),
  ),
)

const Timer = compose(
  refreshed,
  withProps(({ value = 0 }) => ({
    children: ((Date.now() - value) / 1000) | 0,
  })),
)('div')

const Resources = compose(
  pure,
  withProps({ onChange: Function.prototype }),
  withProps({
    value: { type: 'device', fields: ['id', 'name', 'performance'] },
    values: [
      { type: 'device', fields: ['id', 'name'] },
      { type: 'device', fields: ['name'] },
      { type: 'user', fields: ['id', 'name'] },
      { type: 'user', fields: ['name'] },
      { type: 'device', fields: ['id', 'name', 'performance'] },
    ],
  }),
  editable,
  cyclable,
  object,
)(function Resources({ value, onCycle, property }) {
  return $(
    'div',
    null,
    // Data table
    $('button', { onClick: onCycle }, 'Switch query'),
    $('br'),
    'Limit items to: ',
    $(Number, { ...property('limit'), defaultValue: 3, min: 1, max: 10 }),
    $(Table, value),
    $(Aggregations),
  )
})

function countFirstValues(values, property) {
  const { length } = values
  let index = 0
  const value = get(values[index], property)
  if (value == null) {
    return index
  }
  while (++index < length && get(values[index], property) === value) {
    // Continue
  }
  return index
}

function countLastValues(values, property) {
  const { length } = values
  let index = length - 1
  const value = get(values[index], property)
  if (value == null) {
    return index
  }
  while (index-- > 0 && get(values[index], property) === value) {
    // Continue
  }
  return length - (index + 1)
}

const Table = compose(
  pure,
  withPropsOnChange(
    ['type', 'fields', 'limit'],
    ({ type, fields, limit = 3 }) => ({
      request,
      query: {
        type,
        method: 'list',
        refresh: true,
        fields,
        start: 0,
        limit,
        filter: {
          performance_gte: 2,
        },
        order: [{ key: 'performance', descending: false }],
      },
    }),
  ),
  syncedProp('query'),
  queried,
  flattenProp('value'),
  resilient,
  array,
  withHandlers({
    onRefresh: ({ onChangeQuery, query }) => () =>
      onChangeQuery({
        ...query,
        refresh: true,
        reversed: false,
        start: 0,
        order: [{ key: 'performance' }],
        filter: {
          ...query.filter,
          performance_gte: 2,
          performance_lte: null,
        },
      }),
    concatValue: ({ query: { refresh, reversed, fields } }) => (
      value,
      { transformedValue = EMPTY_ARRAY },
    ) => {
      return refresh
        ? value
        : reversed
        ? [
            ...uniqBy(
              [
                ...reverse([...value]),
                ...slice(transformedValue, 0, value.length),
              ],
              fields[0],
            ),
            ...slice(transformedValue, value.length),
          ]
        : [
            ...slice(transformedValue, 0, -value.length),
            ...uniqBy(
              [...slice(transformedValue, -value.length), ...value],
              fields[0],
            ),
          ]
    },
    replaceValue: ({ query: { reversed } }) => (value) =>
      reversed ? reverse([...value]) : value,
  }),
  withProps(({ mode = 'concat', concatValue, replaceValue }) => ({
    transformValue: mode === 'concat' ? concatValue : replaceValue,
  })),
  transformable,
  withHandlers({
    onQueryPrevious: ({ onChangeQuery, query, value }) => () =>
      onChangeQuery({
        ...query,
        refresh: false,
        reversed: true,
        start: countFirstValues(value, 'performance'),
        order: [{ key: 'performance', descending: true }],
        filter: {
          performance_lte: get(value[0], 'performance'),
        },
      }),
    onQueryNext: ({ onChangeQuery, query, value }) => () =>
      onChangeQuery({
        ...query,
        refresh: false,
        reversed: false,
        start: countLastValues(value, 'performance'),
        order: [{ key: 'performance' }],
        filter: {
          performance_gte: get(last(value), 'performance'),
        },
      }),
  }),
)(function Table({
  value,
  type,
  done,
  fields,
  onQueryPrevious,
  onQueryNext,
  onRefresh,
  onAbort,
}) {
  const headerStyle = {
    textAlign: 'left',
    padding: 10,
    opacity: done ? 1 : 0.25,
  }
  const rowStyle = {
    borderTop: '1px solid #7f7f7f',
    padding: 10,
    opacity: done ? 1 : 0.25,
  }
  return $(
    'table',
    { style: { width: '100%' } },
    $('caption', null, `${upperFirst(type)} count: ${value.length}`),
    $(
      'thead',
      null,
      $(
        'tr',
        null,
        map(fields, (name, key) =>
          $('th', { style: headerStyle, key }, upperFirst(name)),
        ),
      ),
    ),
    $(
      'tbody',
      null,
      map(value, (value, key) =>
        $(
          'tr',
          { key },
          map(fields, (name, key) =>
            $('td', { style: rowStyle, key }, value[name]),
          ),
        ),
      ),
      $(
        'tr',
        null,
        $(
          'td',
          { colSpan: fields.length },
          $('button', { onClick: onQueryPrevious }, 'Previous'),
          $('button', { onClick: onQueryNext }, 'Next'),
          $('button', { onClick: onRefresh }, 'Refresh'),
          $('button', { disabled: done, onClick: onAbort }, 'Abort'),
        ),
      ),
    ),
  )
})

const Aggregations = pure(function Aggregations() {
  return $(
    'div',
    null,
    $('h4', null, 'Users'),
    $(
      'ul',
      null,
      $(User, { value: 1 }),
      $(User, { value: 2 }),
      $(User, { value: 3 }),
      $(User, { value: 4 }),
      $(User, { value: 4 }),
      $(User, { value: 5 }),
    ),
    $('h4', null, 'Devices'),
    $(
      'ul',
      null,
      $(Device, { value: 1 }),
      $(Device, { value: 2 }),
      $(Device, { value: 3 }),
    ),
  )
})

const Request = compose(
  pure,
  withPropsOnChange(['value', 'type'], ({ value: id, type }) => ({
    request,
    query: {
      type,
      value: { id },
    },
  })),
  queried,
)(function Request({ value: { done, value, error }, onAbort }) {
  return $(
    'li',
    null,
    !done
      ? ['Loading…', $('button', { onClick: onAbort, key: 'cancel' }, 'Cancel')]
      : error
      ? $('span', { style: { color: 'red' } }, error.message)
      : value.name,
  )
})

const User = withProps({ type: 'user' })(Request)
const Device = withProps({ type: 'device' })(Request)

export const App = compose(
  withProps({
    request,
    query: { type: 'value' },
    delay: 500,
  }),
  syncedProp('query'),
  queried,
  withHandlers({
    onChange: ({ onChangeQuery }) => (value) =>
      onChangeQuery({
        type: 'value',
        method: 'put',
        value,
      }),
  }),
  flattenProp('value'),
  resilient,
  delayable,
  editable,
  object,
)(function App({ property, done, error }) {
  return $(
    'div',
    null,
    $('h1', null, 'Realue'),
    $(
      'p',
      null,
      !done
        ? 'Loading…'
        : error
        ? [
            'It looks like the API server is not running. Start it with: ',
            $('code', null, 'npm run start:api'),
          ]
        : 'Ready.',
    ),
    $('h2', null, 'Timers'),
    $(Timer, { value: Date.now() }),
    $('h2', null, 'Todos'),
    $(EditedItems, property('todos')),
    $('h2', null, 'Color'),
    $(Color, property('color')),
    $('h2', null, 'Resources'),
    $(Resources),
    $('h2', null, 'Delayed'),
    $(Toggle, { ...property('toggle'), delay: 2000 }),
    $('h2', null, 'Children'),
    $(Article, { value: { header: 'Title', body: 'Content' } }),
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
