import test from 'ava'
import { createContext } from 'react'
import render from 'react-test-renderer'
import { compose } from 'recompose'

import { $ } from '../tools'
import { withContext, fromContext } from '../contexts'

const Context = createContext()

const Consumer = compose(
  withContext(Context.Provider),
  fromContext(Context.Consumer),
)(({ value }) => $('pre', JSON.stringify(value, null, 2)))

test('decorates array component', (assert) => {
  assert.snapshot(
    render.create($(Consumer, { value: 'Some context value' })).toJSON(),
  )
})
