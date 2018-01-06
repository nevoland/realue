import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { value } from '../value'

test('returns functions', assert => {
  assert.is(typeof value, 'function')
  assert.is(typeof value(Function.prototype), 'function')
})

test('decorates value component', assert => {
  const Value = value(({ value }) => $('p', null, value))
  assert.snapshot(render.create($(Value, { value: 'Hello' })).toJSON())
})
