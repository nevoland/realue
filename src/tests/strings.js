import test from 'ava'
import render from 'react-test-renderer'

import { $ } from '../tools'
import { string } from '../strings'

test('returns a function', (assert) => {
  assert.is(typeof string, 'function')
  assert.is(typeof string(Function.prototype), 'function')
})

const String = string(({ value }) =>
  $('span', !value ? 'No value provided' : value),
)

test('sets default value', (assert) => {
  assert.snapshot(render.create($(String)).toJSON())
  assert.snapshot(render.create($(String, { value: null })).toJSON())
})

test('takes provided value', (assert) => {
  assert.snapshot(render.create($(String, { value: 'Value' })).toJSON())
})
