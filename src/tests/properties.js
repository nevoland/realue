import test from 'ava'
import render from 'react-test-renderer'
import { compose } from 'recompose'

import { $ } from '../tools'
import {
  logProps,
  omitProps,
  withEffect,
  onPropsChange,
  defaultProp,
  initialProp,
  suspendedProp,
  delayedProp,
  editableProp,
  syncedProp,
  cycledProp,
  resilientProp,
} from '../properties'

const Value = compose(
  logProps(['value']),
  omitProps('value'),
  withEffect(
    ['value'],
    ({ value, onValueEffect }) => onValueEffect && onValueEffect(value),
  ),
  onPropsChange(
    ['value'],
    ({ value, onValueChange }) => onValueChange && onValueChange(value),
  ),
  defaultProp('value'),
  initialProp('value'),
  suspendedProp('value'),
  delayedProp('value'),
  editableProp('value'),
  syncedProp('value'),
  cycledProp('value'),
  resilientProp('value'),
)(({ value }) => $('pre', JSON.stringify(value, null, 2)))

test('decorates component', (assert) => {
  assert.snapshot(render.create($(Value)).toJSON())
})
