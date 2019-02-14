import { createElement as $, Fragment, memo } from 'react'
import { capitalize } from 'lodash'
import { compose } from 'recompose'
import PropTypes from 'prop-types'

import {
  withHops,
  withState,
  withPropsOnChange,
  withProps,
  withHandlers,
  branch,
  setPropTypes,
  lifecycle,
  renderComponent,
} from '../../src/hooks'

export const Hooks = compose(
  memo,

  withHops(
    withState('value', 'setValue', ''),
    withState('transform', 'setTransform', null),
    lifecycle({
      componentDidMount() {
        console.log('mounted')
      },
      componentDidUpdate(prevProps, prevState) {
        console.log('props', 'prevProps', this.props, prevProps)
      },
      componentWillUnmount() {
        console.log('unmounted')
      },
    }),
    branch(
      ({ transform }) => transform != null,
      withPropsOnChange(['value', 'transform'], ({ value, transform }) => ({
        transformedValue:
          transform === 'upperCase'
            ? value.toUpperCase()
            : transform === 'capitalized'
            ? capitalize(value)
            : value,
      })),
      withProps(({ value }) => ({
        transformedValue: value,
      })),
    ),
    withHandlers({
      onChange: ({ setValue }) => (event) => setValue(event.target.value),
      setUpperCase: ({ setTransform }) => () => setTransform('upperCase'),
      setTitleCase: ({ setTransform }) => () => setTransform('capitalized'),
      setNormal: ({ setTransform }) => () => setTransform(null),
      disable: ({ setTransform }) => () => setTransform('disabled'),
    }),
    branch(
      ({ transform }) => transform === 'disabled',
      renderComponent(({ setNormal }) =>
        $('button', { onClick: setNormal }, 'Enable'),
      ),
    ),
    setPropTypes({
      // Provoke a warning
      value: PropTypes.number,
    }),
  ),
)(function Hooks(props) {
  const {
    value,
    transformedValue,
    onChange,
    transform,
    setUpperCase,
    setTitleCase,
    setNormal,
    disable,
  } = props
  return $(
    Fragment,
    null,
    'Value: ',
    $('input', { value, onChange }),
    $('br'),
    $(
      'button',
      { disabled: transform === 'upperCase', onClick: setUpperCase },
      'Uppercase',
    ),
    $(
      'button',
      { disabled: transform === 'capitalized', onClick: setTitleCase },
      'Capitalized',
    ),
    $('button', { disabled: transform == null, onClick: setNormal }, 'Normal'),
    $('button', { onClick: disable }, 'Disable'),
    $('br'),
    'Result: ',
    transformedValue,
  )
})
