import test from 'ava'
import render from 'react-test-renderer'

import { $ } from '../tools'
import { number } from '../numbers'

test('returns a function', (assert) => {
  assert.is(typeof number, 'function')
  assert.is(typeof number(Function.prototype), 'function')
})

const Number = number(({ value }) => $('span', value))

test('sets default value', (assert) => {
  assert.snapshot(render.create($(Number)).toJSON())
  assert.snapshot(render.create($(Number, { value: null })).toJSON())
})

test('takes provided value', (assert) => {
  assert.snapshot(render.create($(Number, { value: 1 })).toJSON())
})
