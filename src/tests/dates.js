import test from 'ava'
import render from 'react-test-renderer'

import { $ } from '../tools'
import { date } from '../dates'

test('returns a function', (assert) => {
  assert.is(typeof date, 'function')
  assert.is(typeof date(Function.prototype), 'function')
})

const Number = date(({ value }) => $('span', value.toUTCString()))

test('sets default value', (assert) => {
  assert.snapshot(render.create($(Number)).toJSON())
  assert.snapshot(render.create($(Number, { value: null })).toJSON())
})

test('takes provided value', (assert) => {
  assert.snapshot(
    render.create($(Number, { value: new Date(443750400000) })).toJSON(),
  )
})
