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
  suspendableProp,
  delayableProp,
  editableProp,
  syncedProp,
  cycledProp,
  resilientProp,
  delayableHandler,
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
  suspendableProp('value'),
  delayableProp('value'),
  editableProp('value'),
  syncedProp('value'),
  cycledProp('value'),
  resilientProp('value'),
  delayableHandler({
    name: 'onValueChange',
    delayName: 'delay',
  }),
)(({ value }) => $('pre', JSON.stringify(value, null, 2)))

test('decorates component', (assert) => {
  assert.snapshot(render.create($(Value)).toJSON())
})
