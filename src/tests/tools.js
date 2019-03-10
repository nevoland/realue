import test from 'ava'
import render from 'react-test-renderer'

import { $, hasProp, hasNotProp, isValidDate, escapeRegex } from '../tools'

test('$', (assert) => {
  const p1 = render.create($('p', 'Text'))
  assert.deepEqual(p1.root.props, { children: 'Text' }, 'child as props')
  const p2 = render.create($('p', { id: 'text' }, 'Text'))
  assert.deepEqual(
    p2.root.props,
    { id: 'text', children: 'Text' },
    'props and child',
  )
  const p3 = render.create($('p', null, 'Text'))
  assert.deepEqual(p3.root.props, { children: 'Text' }, 'no props')
  const p4 = render.create($('p', 'Text', 'More text'))
  assert.deepEqual(
    p4.root.props,
    { children: ['Text', 'More text'] },
    'two children',
  )
  const p5 = render.create($('p', ['Text', 'More text', 'Even more text']))
  assert.deepEqual(
    p5.root.props,
    { children: ['Text', 'More text', 'Even more text'] },
    'three children',
  )
  const p6 = render.create(
    $('p', null, ['Text', 'More text', 'Even more text']),
  )
  assert.deepEqual(
    p6.root.props,
    { children: ['Text', 'More text', 'Even more text'] },
    'three children no props',
  )
})

test('hasProp', (assert) => {
  assert.is(typeof hasProp, 'function')
  assert.is(typeof hasProp('onChange'), 'function')
  assert.is(hasProp('onChange'), hasProp('onChange'), 'memoizes')
  assert.true(hasProp('onChange')({ onChange() {} }), 'detects set onChange')
  assert.false(hasProp('onChange')({}), 'detects missing onChange')
})

test('hasNotProp', (assert) => {
  assert.is(typeof hasNotProp, 'function')
  assert.is(typeof hasNotProp('onChange'), 'function')
  assert.is(hasNotProp('onChange'), hasNotProp('onChange'), 'memoizes')
  assert.false(
    hasNotProp('onChange')({ onChange() {} }),
    'detects set onChange',
  )
  assert.true(hasNotProp('onChange')({}), 'detects missing onChange')
})

test('isValidDate', (assert) => {
  assert.is(typeof isValidDate, 'function')
  assert.true(isValidDate(new Date()), 'detects valid date')
  assert.true(isValidDate(new Date('1984-01-01')), 'detects valid date')
  assert.false(isValidDate(new Date('')), 'detects invalid date')
  assert.false(isValidDate(new Date('wrong')), 'detects invalid date')
})

test('escapeRegex', (assert) => {
  assert.is(typeof escapeRegex, 'function')
  assert.is(
    escapeRegex('[.?*+^$[]\\/(){}|-]'),
    '\\[\\.\\?\\*\\+\\^\\$\\[\\]\\\\/\\(\\)\\{\\}\\|\\-\\]',
  )
})
