import test from 'ava'
import { createElement as $ } from 'react'
import render from 'react-test-renderer'
import { object } from '../object'

test('returns functions', assert => {
  assert.is(typeof object, 'function')
  assert.is(typeof object(Function.prototype), 'function')
})

test('decorates object component', assert => {
  const Property = ({ value, name }) => $('li', null, name, ': ', value)
  const Movie = object(({ property }) =>
    $(
      'ul',
      null,
      $(Property, property('title')),
      $(Property, property('year')),
    ),
  )
  assert.snapshot(
    render
      .create($(Movie, { value: { title: 'Serenity', year: 2005 } }))
      .toJSON(),
  )
})
