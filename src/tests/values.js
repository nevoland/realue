import test from 'ava'
import render from 'react-test-renderer'
import { compose } from 'recompose'

import { $ } from '../tools'
import {
  defaultValue,
  initialValue,
  filterable,
  transformable,
  suspendable,
  delayable,
  synced,
  editable,
  cyclable,
  promised,
  resilient,
} from '../values'

const Value = compose(
  defaultValue,
  initialValue,
  filterable,
  transformable,
  suspendable,
  delayable,
  synced,
  editable,
  cyclable,
  promised,
  resilient,
)(({ value }) => $('pre', JSON.stringify(value, null, 2)))

test('decorates component', (assert) => {
  assert.snapshot(render.create($(Value)).toJSON())
})
