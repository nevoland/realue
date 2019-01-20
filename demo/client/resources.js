import { createElement as $ } from 'react'
import {
  compose,
  pure,
  withHandlers,
  withProps,
  defaultProps,
  renameProp,
} from 'recompose'

import {
  array,
  boolean,
  cyclable,
  defaultValue,
  delayable,
  editable,
  editableProp,
  filterable,
  fromEvent,
  number,
  object,
  omitProps,
  onKeysDown,
  onPropsChange,
  parseNumber,
  removable,
  string,
  toggledEditing,
  transformable,
  syncedFocus,
  withChildren,
  withChild,
  EMPTY_OBJECT,
} from '../../src'

export const Resources = compose(pure)(function Resources(props) {
  const { value } = props
  return $('div', null, 'Nothing yet!')
})
