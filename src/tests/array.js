import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { map } from 'lodash'

import { array } from '../array'

test('returns functions', assert => {
  assert.is(typeof array, 'function')
  assert.is(typeof array(Function.prototype), 'function')
})

test('decorates array component', assert => {
  const Item = ({ value }) => $('li', null, value)
  const Numbers = array(({ value, item }) =>
    $('ul', null, map(value, value => $(Item, item(value)))),
  )
  assert.snapshot(render.create($(Numbers, { value: [1, 2, 3] })).toJSON())
})
