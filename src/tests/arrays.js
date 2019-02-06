import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { map } from 'lodash'

import { fromEvent } from '../dom'
import { array, removable } from '../arrays'

import { ThrownValue } from './'

test('returns a function', (assert) => {
  assert.is(typeof array, 'function')
  assert.is(typeof array(Function.prototype), 'function')
})

const Item = removable(({ value, onRemove }) =>
  $('li', null, value, $('button', { onClick: onRemove })),
)
const ItemCreator = fromEvent()(({ onChange }) =>
  $('button', { onClick: onChange }),
)
const Numbers = array(({ value, item, onAddItem }) =>
  $(
    'ul',
    null,
    map(value, (value, index) => $(Item, item(index))),
    onAddItem &&
      $(ItemCreator, {
        value: value.length + 1,
        name: value.length,
        onChange: onAddItem,
      }),
  ),
)

test('decorates array component', (assert) => {
  assert.snapshot(render.create($(Numbers, { value: [1, 2, 3] })).toJSON())
})

test('handles null values', (assert) => {
  assert.snapshot(render.create($(Numbers)).toJSON())
})

test('sets properties in non-edition mode', (assert) => {
  const rendering = render.create($(Numbers, { value: [1, 2] }))
  const { root } = rendering

  const items = root.findAllByType(Item)
  assert.is(items.length, 2)

  const [one, two] = items
  assert.is(one.props.name, 0)
  assert.is(two.props.name, 1)

  assert.is(one.props.onChange, undefined)
  assert.is(two.props.onChange, undefined)

  rendering.unmount()
})

test('sets properties in edition mode', (assert) => {
  const onChange = (value, name, payload) => {
    throw new ThrownValue({ value, name, payload })
  }
  const rendering = render.create(
    $(Numbers, { onChange, name: 'numbers', value: [1, 2] }),
  )
  const { root } = rendering

  const items = root.findAllByType(Item)
  assert.is(items.length, 2)

  const [one, two] = items
  assert.is(typeof one.props.onChange, 'function')
  assert.is(typeof two.props.onChange, 'function')

  const { value: result } = assert.throws(() => {
    const { onChange, name } = one.props
    onChange(3, name, null)
  })
  assert.deepEqual(
    result,
    {
      value: [3, 2],
      name: 'numbers',
      payload: null,
    },
    'updates array item',
  )

  const create = root.findByType(ItemCreator).findByType('button')
  const { value: insert } = assert.throws(() => {
    create.props.onClick(null)
  })
  assert.deepEqual(
    insert,
    {
      value: [1, 2, 3],
      name: 'numbers',
      payload: null,
    },
    'appends array item',
  )

  const remove = one.findByType('button')
  const { value: deletion } = assert.throws(() => {
    remove.props.onClick(null)
  })
  assert.deepEqual(
    deletion,
    {
      value: [2],
      name: 'numbers',
      payload: null,
    },
    'removes first array item',
  )

  rendering.unmount()
})
