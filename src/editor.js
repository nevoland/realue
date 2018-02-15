import PropTypes from 'prop-types'
import {
  compose,
  branch,
  withHandlers,
  setPropTypes,
  mapProps,
} from 'recompose'

import { withBuffer, promisify, hasProp } from './tools'

export const creator = branch(
  hasProp('onChange'),
  compose(
    withBuffer(),
    withHandlers({
      onChange: ({ setBuffer }) => value => setBuffer(value),
      cancel: ({ value, buffer, setBuffer, onCancel }) => event =>
        setBuffer(
          value,
          onCancel == null ? undefined : () => onCancel(value, buffer, event),
        ),
      save: ({ onChange, value, buffer, setBuffer }) => event =>
        buffer === undefined || value === buffer
          ? Promise.resolve()
          : promisify(onChange(buffer, value, event)).then(
              result =>
                new Promise(
                  resolve => setBuffer(value, () => resolve(result)),
                  result,
                ),
            ),
    }),
    mapProps(props => ({
      ...withBuffer.omit(props),
      value: props.buffer,
    })),
  ),
)

export const editor = compose(
  setPropTypes({
    value: PropTypes.any.isRequired,
    loading: PropTypes.bool,
    editing: PropTypes.bool,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
  }),
  branch(
    hasProp('onChange'),
    compose(
      withBuffer(({ value, editing }) => (!editing ? undefined : value)),
      withHandlers({
        edit: ({ value, setBuffer, onEdit }) => event =>
          setBuffer(
            value,
            onEdit == null ? undefined : () => onEdit(value, event),
          ),
        onChange: ({ setBuffer }) => value => setBuffer(value),
        cancel: ({ value, buffer, setBuffer, onCancel }) => event =>
          setBuffer(
            undefined,
            onCancel == null ? undefined : () => onCancel(value, buffer, event),
          ),
        save: ({ onChange, value, buffer, setBuffer }) => event =>
          buffer === undefined || value === buffer
            ? new Promise(resolve => setBuffer(undefined, resolve))
            : promisify(onChange(buffer, value, event)).then(
                result =>
                  new Promise(
                    resolve => setBuffer(undefined, () => resolve(result)),
                    result,
                  ),
              ),
      }),
      mapProps(props => {
        const { value, buffer, onChange } = props
        const editing = buffer !== undefined
        return {
          ...withBuffer.omit(props),
          value: editing ? buffer : value,
          onChange: editing ? onChange : null,
        }
      }),
    ),
  ),
)
