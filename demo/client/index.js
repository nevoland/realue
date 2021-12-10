import { Fragment, memo, useState } from 'react'
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
  isEmpty,
  identity,
} from 'lodash'
import {
  compose,
  withHandlers,
  withProps,
  defaultProps,
  renameProp,
  flattenProp,
  withPropsOnChange,
} from 'recompose'

import {
  $,
  array,
  boolean,
  cyclable,
  defaultValue,
  delayable,
  domProps,
  editable,
  editableProp,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  filterable,
  fromEvent,
  initialValue,
  logProps,
  number,
  object,
  onKeysDown,
  onPropsChange,
  parseNumber,
  persisted,
  queried,
  refreshed,
  removable,
  resilient,
  returned,
  scoped,
  sessionStorage,
  string,
  suspendable,
  switchChild,
  synced,
  syncedFocus,
  syncedProp,
  toggledEditing,
  transformable,
  withBounds,
  withChild,
  withChildren,
  withHook,
  withNode,
  withEffect,
} from '../../src'
import { Flex, Box } from '../../src/layout'

import { request } from './requests'

const Text = compose(
  memo,
  defaultProps({ defaultValue: '', focus: false }),
  defaultValue,
  string,
  fromEvent('target.value'),
  editableProp('node'),
  syncedFocus,
)(
  ({
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    onChangeNode,
    onKeyDown,
    className,
  }) =>
    !onChange
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
        }),
)

const Checkbox = compose(
  memo,
  defaultValue,
  boolean,
  fromEvent('target.checked'),
)(({ value, onChange, label }) =>
  $(
    'label',
    $('input', {
      type: 'checkbox',
      checked: value,
      onChange,
      disabled: !onChange,
    }),
    label == null ? null : $('span', ' ', label),
  ),
)

const Item = compose(
  memo,
  object,
  removable,
)(({ property, onRemove }) =>
  $(
    'li',
    $(Checkbox, { ...property('done'), defaultValue: false }),
    ' ',
    $(Text, {
      ...property('label'),
      placeholder: 'Untitled item',
    }),
    onRemove && $('button', { onClick: onRemove }, 'Remove'),
  ),
)

const ITEMS = times(3, constant(EMPTY_OBJECT))

const Items = compose(
  memo,
  array,
  withChildren(Item),
  withHandlers({
    onAddThree: ({ value, onAddItems }) => (payload) =>
      onAddItems(ITEMS, value.length, payload),
  }),
)(({ value, children, onAddItem, onAddThree }) =>
  $(
    'div',
    null,
    $('ul', null, children),
    onAddItem &&
      $(ItemCreator, { onChange: onAddItem, onAddThree, name: value.length }),
  ),
)

const ItemCreator = compose(
  memo,
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
)(
  ({
    value,
    onPush,
    onPull,
    onAddThree,
    property,
    focus,
    onChangeFocus,
    onKeyDown,
  }) =>
    $(
      'ul',
      $(Text, {
        ...property('label'),
        focus,
        onChangeFocus,
        onKeyDown,
      }),
      $('button', { onClick: onPush, disabled: !value.label }, 'Add'),
      $('button', { onClick: onPull }, 'Cancel'),
      onAddThree && $('button', { onClick: onAddThree }, 'Add 3'),
    ),
)

const EditedItems = compose(
  memo,
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
)(({ children, editing, onToggleEditing }) =>
  $(
    'div',
    $(Checkbox, {
      value: editing,
      onChange: onToggleEditing,
      label: 'Edit',
    }),
    children,
  ),
)

export const Bounds = compose(
  withNode,
  withBounds(['width', 'height', 'top', 'left']),
)(({ width, height, top, left, node }) =>
  $(
    'div',
    {
      ref: node,
      style: {
        margin: 32,
        padding: 16,
        backgroundColor: '#e6e6e6',
      },
    },
    $('div', `Dimensions: ${width}x${height}`),
    $('div', `Location: ${top},${left}`),
  ),
)

const Color = compose(
  memo,
  object,
)(({ property, value }) =>
  $(
    'div',
    $('div', {
      style: {
        width: 30,
        height: 30,
        backgroundColor: `rgb(${value.r || 0},${value.g || 0},${value.b || 0})`,
      },
    }),
    $(
      'ul',
      map(['r', 'g', 'b'], (name) =>
        $(ColorProperty, {
          ...property(name, name),
          type: 'number',
          min: 0,
          max: 255,
        }),
      ),
    ),
  ),
)

const Number = compose(
  memo,
  defaultProps({
    type: 'number',
    defaultValue: '',
    placeholder: '0',
    autoComplete: 'off',
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
  domProps,
)('input')

const ColorProperty = compose(memo)(({ value, name, onChange, min, max }) =>
  $(
    'li',
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
  ),
)

export const Toggle = compose(
  memo,
  delayable,
  onPropsChange(
    ['value'],
    ({ value, onChange, name }) => value && onChange && onChange(false, name),
  ),
  renameProp('onPush', 'onChange'),
  cyclable,
)(({ value, onCycle }) =>
  $(
    'div',
    $(
      'p',
      'Clicking this button will switch the value to "ON" for 2 seconds only.',
    ),
    $('button', { onClick: onCycle }, 'Toggle'),
    $('p', value ? 'ON' : 'OFF'),
  ),
)

export const Switch = compose(
  memo,
  withProps({
    values: ['a', 'b', 'c'],
    defaultValue: 'a',
  }),
  synced,
  defaultValue,
  cyclable,
  switchChild('value', {
    a: () => 'Click the "Switch" button to switch between components.',
    b: () => 'Nice! Click it again…',
    c: () => 'Excellent!',
  }),
)(({ onCycle, children }) =>
  $('div', $('button', { onClick: onCycle }, 'Switch'), $('br'), children),
)

const Article = withChild({
  header: [
    'h1',
    ({ value }, name) => ({
      children: value[name],
    }),
  ],
  body: ['p', ({ value }, name) => ({ children: value[name] })],
})(({ children = EMPTY_OBJECT }) =>
  $('div', $('div', children.header), $('div', children.body)),
)

const Timer = compose(
  withProps({
    delay: 500,
  }),
  refreshed,
  withProps(({ value = 0 }) => ({
    style: { opacity: Math.abs(((Date.now() - value) % 1000) - 500) / 1000 },
    children: ((Date.now() - value) / 1000) | 0,
  })),
)('div')

const Resources = compose(
  memo,
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
)(({ value, onCycle, property }) =>
  $(
    'div',
    // Data table
    $('button', { onClick: onCycle }, 'Switch query'),
    $('br'),
    'Limit items to: ',
    $(Number, { ...property('limit'), defaultValue: 3, min: 1, max: 10 }),
    $(Table, value),
    $(Aggregations),
  ),
)

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
  memo,
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
)(
  ({
    value,
    type,
    done,
    fields,
    onQueryPrevious,
    onQueryNext,
    onRefresh,
    onAbort,
  }) => {
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
      $('caption', `${upperFirst(type)} count: ${value.length}`),
      $(
        'thead',
        $(
          'tr',
          map(fields, (name, key) =>
            $('th', { style: headerStyle, key }, upperFirst(name)),
          ),
        ),
      ),
      $(
        'tbody',
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
  },
)

const Aggregations = memo(() =>
  $(
    'div',
    $('h4', 'Users'),
    $(
      'ul',
      $(User, { value: 1 }),
      $(User, { value: 2 }),
      $(User, { value: 3 }),
      $(User, { value: 4 }),
      $(User, { value: 4 }),
      $(User, { value: 5 }),
      $(Request, { type: 'person', value: 42 }),
    ),
    $('h4', 'Devices'),
    $(
      'ul',
      $(Device, { value: 1 }),
      $(Device, { value: 2 }),
      $(Device, { value: 3 }),
      $(Request, { type: 'something' }),
    ),
  ),
)

const Request = compose(
  memo,
  withPropsOnChange(['value', 'type'], ({ value: id, type }) => ({
    request,
    query: {
      type,
      value: { id },
    },
  })),
  queried,
)(({ value: { done, value, error }, onAbort }) =>
  $(
    'li',
    !done
      ? ['Loading…', $('button', { onClick: onAbort, key: 'cancel' }, 'Cancel')]
      : error
      ? $(
          'span',
          { style: { color: 'red' } },
          error.value ? JSON.stringify(error.value) : error.message,
        )
      : value.name,
  ),
)

const User = withProps({ type: 'user' })(Request)
const Device = withProps({ type: 'device' })(Request)

export const Progress = compose(
  memo,
  withProps(({ value, delay }) => ({
    delay: value ? (delay / 2) | 0 : delay,
    initialValue: true,
  })),
  initialValue,
  suspendable,
)(({ value, error }) =>
  $(
    'p',
    !value
      ? 'Loading…'
      : error
      ? [
          'It looks like the API server is not running. Start it with: ',
          $('code', 'npm run start:api'),
        ]
      : ' ',
  ),
)

export const Compute = compose(
  withProps({ defaultValue: { a: 1, b: 2 } }),
  defaultValue,
  memo,
  synced,
  object,
)(({ value: { a = 0, b = 0 }, property }) =>
  $(
    'div',
    $(Number, property('a')),
    $(Number, property('b')),
    $('p', `${a} + ${b} = ${a + b}`),
  ),
)

export const Hooks = compose(
  withProps({ initialCount: 0 }),
  withHook(useState, ['initialCount'], ['count', 'onChangeCount']),
)(({ count, onChangeCount }) =>
  $(
    'div',
    'Count: ',
    count,
    $('button', { onClick: () => onChangeCount(count + 1) }, 'Increment'),
  ),
)

const PersistedText = compose(
  withProps({ domain: 'persisted', storage: sessionStorage }),
  persisted,
  synced,
  string,
  fromEvent('target.value'),
  domProps,
)('input')

const Input = compose(
  fromEvent('target.value'),
  withEffect(['value', 'name'], ({ value, name, onChangeError, type }) => {
    if (type !== 'number') {
      return
    }
    if (value && isNaN(parseInt(value, 10))) {
      onChangeError(['Please enter a number damit!'], name)
      return
    }
    if (parseInt(value, 10) < 18) {
      onChangeError(['You need to be older damit!'], name)
      return
    }
    onChangeError(undefined, name)
  }),
)(({ error, onChangeError, ...props }) =>
  $(
    'div',
    { style: { padding: 16, marginBottom: 8, border: '1px solid black' } },
    $('input', props),
    error && $('div', { style: { color: 'red' } }, error),
  ),
)

const Form = compose(
  withProps({ error: { age: ['Is required'] } }),
  synced,
  withHandlers({
    onSubmit: ({ value, onChangeError }) => (event) => {
      event.preventDefault()
      if (!value) {
        onChangeError({ '': ['Il faut remplir la Form petit plaisantin'] })
        return
      }
      if (!value.age) {
        onChangeError({ age: ['Age is required'] })
        return
      }
      onChangeError(EMPTY_OBJECT)
    },
  }),
  // { value, error }
  object,
)(({ property, onSubmit, error }) =>
  $(
    'form',
    { style: { backgroundColor: 'gold', padding: 16 } },
    $(Input, { ...property('name'), placeholder: 'Name' }),
    $(Input, {
      ...property('age'),
      type: 'number',
      placeholder: 'Age',
    }),
    $('div', { style: { color: 'red' } }, error['']),
    $('button', { onClick: onSubmit }, 'Check'),
  ),
)

const Form2 = compose(
  withProps({ error: { '': ['Is required'] } }),
  synced,
  withHandlers({
    onSubmit: ({ value, onChangeError }) => (event) => {
      event.preventDefault()
      if (value < 6) {
        onChangeError({ '': ['Higher !'] })
        return
      }
      if (value > 16) {
        onChangeError({ '': ['Lower !'] })
        return
      }
      onChangeError(EMPTY_OBJECT)
    },
  }),
)(({ value, name, onChange, error, onChangeError, onSubmit }) =>
  $(
    'form',
    { style: { backgroundColor: 'gold', padding: 16 } },
    $(Input, {
      value,
      name,
      onChange,
      onChangeError,
      error: error[''],
      placeholder: 'Number between 6 and 16',
    }),
    $('button', { onClick: onSubmit }, 'Check'),
  ),
)

const Form3 = compose(
  memo,
  synced,
  array,
  withHandlers({
    onAddItem: ({ onAddItem, onChangeError, value, error }) => (item) => {
      if (value.length > 2) {
        onChangeError({ ...error, ['']: ['Too much numbers'] })
      } else if (item < 7) {
        onChangeError({ ...error, [item]: ['This item is too low'] })
      } else if (item > 9) {
        onChangeError({ ...error, [item]: ['This item is too high'] })
      }
      onAddItem(item)
    },
  }),
  logProps(['error']),
)(({ value, item, onAddItem, error }) =>
  $(
    'div',
    $('h2', 'Numbers between (exluded) 6 and 10'),
    $(
      'ul',
      map(value, (name, key) =>
        $(
          'li',
          { key },
          `${item(key).value} ${
            item(key, key, identity).error
              ? `- ${item(key, key, identity).error}`
              : ''
          }`,
        ),
      ),
    ),
    onAddItem && $(ItemCreator2, { onChange: onAddItem, name: value.length }),
    error && error[''] && $('div', { style: { color: 'red' } }, error['']),
  ),
)

const ItemCreator2 = compose(
  withProps({
    filterOnChange: stubFalse,
  }),
  filterable,
  editable,
  memo,
)(({ value, onPush, onPull, onChange, focus, onChangeFocus, onKeyDown }) =>
  $(
    'ul',
    $(Text, {
      value,
      onChange,
      focus,
      onChangeFocus,
      onKeyDown,
    }),
    $('button', { onClick: onPush }, 'Add'),
    $('button', { onClick: onPull }, 'Cancel'),
  ),
)

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
  scoped(flattenProp('value'), returned(['value', 'done', 'error'])),
  resilient,
  delayable,
  editable,
  object,
)(({ value, property, done, error, delay }) =>
  true
    ? $('div', $('h2', 'Form'), $(Form), $(Form2), $(Form3))
    : $(
        'div',
        $('h1', null, 'Realue'),
        $(Progress, { value: done, error, delay }),
        !isEmpty(value) &&
          $(
            Fragment,
            null,
            $('h2', 'Form'),
            $(Form),
            $('h2', 'Delay'),
            $(Number, { ...property('delay'), min: 0, max: 5000 }),
            $('h2', 'Hooks'),
            $(Hooks),
            $('h2', 'Switch'),
            $(Switch),
            $('h2', 'Persisted'),
            $(PersistedText),
            $('h2', 'Compute'),
            $(Compute),
            $('h2', 'Bounds'),
            $(Bounds),
            $('h2', 'Color'),
            $(Color, property('color')),
            $('h2', 'Timers'),
            $(Timer, { value: Date.now() }),
            $('h2', 'Todos'),
            $(EditedItems, property('todos')),
            $('h2', 'Resources'),
            $(Resources),
            $('h2', 'Delayed'),
            $(Toggle, { ...property('toggle'), delay: 2000 }),
            $('h2', 'Children'),
            $(Article, { value: { header: 'Title', body: 'Content' } }),
          ),
      ),
)

function Layout() {
  return $(
    Flex,
    { container: true, direction: 'column', className: 'full-screen' },
    $(
      Flex,
      {
        item: true,
        container: true,
        direction: 'row',
        height: 70,
        align: 'start',
        justify: 'start',
        className: 'a',
      },
      $(
        Flex,
        { item: true, align: 'center', justify: 'center' },
        'Title',
        $('br'),
        'Sub-title',
      ),
    ),
    $(
      Flex,
      { item: true, grow: true, container: true, direction: 'row' },
      $(
        Flex,
        { item: true, scroll: true, className: 'b' },
        $(
          Box,
          { width: 220, padding: 8 },
          'Lorem ipsum officia ullamco enim et in sint pariatur et occaecat cillum deserunt incididunt qui dolor occaecat dolore ut id ut ut elit minim ut sed dolore tempor in ut ad velit adipisicing dolore nostrud minim veniam sit sit ex incididunt dolore magna in incididunt id nostrud dolor ut irure proident deserunt cillum reprehenderit velit occaecat magna commodo sunt pariatur do nostrud culpa proident et ut labore nulla magna est quis ut enim laborum.',
        ),
      ),
      $(
        Flex,
        {
          container: true,
          direction: 'column',
          width: 200,
          className: 'e',
        },
        $(
          Flex,
          { item: true, padding: 8, borderBottom: '1px solid black' },
          'Search…',
        ),
        $(
          Flex,
          { item: true, grow: true, scroll: true },
          map(Array(20), (_, key) =>
            $(
              Flex,
              {
                key,
                container: true,
                item: true,
                align: 'center',
                justify: 'start',
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 16,
                paddingRight: 16,
                // height: 30,
                borderBottom: key === 19 ? undefined : '1px solid black',
              },
              `Item ${key + 1}`,
            ),
          ),
        ),
      ),
      $(
        Flex,
        {
          item: true,
          grow: true,
          container: true,
          direction: 'column',
          className: 'c',
        },
        $(
          Flex,
          { item: true },
          'Sub-title—Lorem ipsum officia ullamco enim et in sint pariatur et occaecat cillum deserunt incididunt',
        ),
        $(
          Flex,
          { item: true, grow: true, scroll: true },
          $('div', { style: { padding: 16 } }, $(App)),
        ),
        $(Flex, { item: true, align: 'center' }, 'Extra options'),
      ),
      $(
        Flex,
        {
          item: true,
          container: true,
          align: 'center',
          justify: 'center',
          className: 'b',
          width: 200,
        },
        '…',
      ),
    ),
    $(
      Flex,
      { container: true, item: true, direction: 'row', className: 'd' },
      $(Flex, { item: true }, $('button', 'Cancel')),
      $(Flex, { item: true, grow: true }),
      $(Flex, { item: true }, $('button', 'Save')),
    ),
  )
}

/* istanbul ignore next */
function start(Layout) {
  render($(Layout), global.document.getElementById('main'))
}

/* istanbul ignore next */
if (global.window) {
  start(Layout)
}

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept(function () {
    start(Layout)
  })
}
