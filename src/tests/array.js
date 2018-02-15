import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { map } from 'lodash'

import { array } from '../array'

const Item = ({ value }) => $('li', null, value)
const Numbers = ({ value, item }) =>
  $('ul', null, map(value, value => $(Item, item(value))))

test('returns functions', assert => {
  assert.is(typeof array, 'function')
  assert.is(typeof array(Function.prototype), 'function')
})

test('decorates array component', assert => {
  assert.snapshot(
    render.create($(array(Numbers), { value: [1, 2, 3] })).toJSON(),
  )
})

test('adds array component', assert => {
  const rendering = render.create($(array(Numbers), { value: [1, 2, 3] }))
  const element = rendering.root.find(element => element.type === Numbers)
  assert.is(typeof element.props.item, 'function')
})
