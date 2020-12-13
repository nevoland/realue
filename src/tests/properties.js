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

test('delayableHandler', (assert) => {
  const Component = delayableHandler({ name: 'onChange', delayName: 'done' })(
    Props,
  )
  let value = null
  const onChange = (nextValue) => {
    value = nextValue
  }
  const rendering = render.create(
    $(Component, {
      onChange,
      done: false,
    }),
  )
  const { root } = rendering
  const { onChange: delayedOnChange } = root.findByType(Props).props
  delayedOnChange('first value')
  delayedOnChange('second value')
  assert.is(value, null)
  rendering.update(
    $(Component, {
      onChange,
      done: true,
    }),
  )
  assert.is(value, 'second value')
  delayedOnChange('third value')
  assert.is(value, 'third value')
})
