import test from 'ava'
import render from 'react-test-renderer'

import { $ } from '../tools'
import { boolean } from '../booleans'

test('returns a function', (assert) => {
  assert.is(typeof boolean, 'function')
  assert.is(typeof boolean(Function.prototype), 'function')
})

const Boolean = boolean(({ value }) => $('span', value ? 'True' : 'False'))

test('sets default value', (assert) => {
  assert.snapshot(render.create($(Boolean)).toJSON())
  assert.snapshot(render.create($(Boolean, { value: null })).toJSON())
})

test('takes provided value', (assert) => {
  assert.snapshot(render.create($(Boolean, { value: true })).toJSON())
})
