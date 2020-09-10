import test from 'ava'
import { createContext } from 'react'
import render from 'react-test-renderer'
import { compose } from 'recompose'

import { $, getter } from '../tools'
import { withContext, fromContext } from '../contexts'

const Context = createContext()

test('sets and gets context', (assert) => {
  const Consumer = compose(
    withContext(Context.Provider),
    fromContext(Context.Consumer),
  )(({ value }) => $('pre', JSON.stringify(value, null, 2)))
  assert.snapshot(
    render.create($(Consumer, { value: 'Some context value' })).toJSON(),
  )
})

test('sets and gets context from specific property', (assert) => {
  const Consumer = compose(
    withContext(Context.Provider, getter('a.b')),
    fromContext(Context.Consumer, 'c'),
  )(({ c: value }) => $('pre', JSON.stringify(value, null, 2)))
  assert.snapshot(
    render.create($(Consumer, { a: { b: 'Some context value' } })).toJSON(),
  )
})
