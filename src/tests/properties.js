import test from 'ava'
import { mapValues, isFunction } from 'lodash'
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

const Props = (props) =>
  $(
    'pre',
    JSON.stringify(
      mapValues(props, (value) =>
        isFunction(value) ? `function() {}` : value,
      ),
      null,
      2,
    ),
  )

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
)(Props)

test('decorates component', (assert) => {
  assert.snapshot(render.create($(Value)).toJSON())
})

test('delayableProp', (assert) => {
  const Component = delayableProp('onChange')(Props)
  assert.snapshot(render.create($(Component)).toJSON())
  assert.snapshot(render.create($(Component, { delayOnChange: 1 })).toJSON())
  assert.snapshot(
    render
      .create(
        $(Component, {
          onChange: Function.prototype,
          delayOnChange: 1,
        }),
      )
      .toJSON(),
  )
})
