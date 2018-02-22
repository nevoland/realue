import PropTypes from 'prop-types'
import {
  compose,
  branch,
  withHandlers,
  setPropTypes,
  mapProps,
} from 'recompose'

import { withBuffer, promisify, hasProp, onPropsChange } from './tools'

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
      save: ({ onChange, value, name, buffer, setBuffer }) => event =>
        buffer === undefined || value === buffer
          ? Promise.resolve()
          : promisify(onChange(buffer, name, event)).then(
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
    editing: PropTypes.bool,
    onEdit: PropTypes.func,
    onChange: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
  }),
  branch(
    hasProp('onChange'),
    compose(
      withBuffer(({ value, editing }) => (!editing ? undefined : value)),
      withHandlers({
        edit: ({ value, name, setBuffer, onEdit }) => payload =>
          setBuffer(
            value,
            onEdit == null ? undefined : () => onEdit(value, name, payload),
          ),
        onChange: ({ setBuffer }) => value => setBuffer(value),
        cancel: ({ name, buffer, setBuffer, onCancel }) => payload =>
          setBuffer(
            undefined,
            onCancel == null
              ? undefined
              : () => onCancel(buffer, name, payload),
          ),
        save: ({
          onChange,
          onSave,
          value,
          name,
          buffer,
          setBuffer,
        }) => payload =>
          buffer === undefined || value === buffer
            ? new Promise(resolve => setBuffer(undefined, resolve))
            : promisify(onChange(buffer, name, payload)).then(
                result =>
                  onSave == null || onSave(result, buffer, name, payload)
                    ? new Promise(resolve =>
                        setBuffer(undefined, () => resolve(result)),
                      )
                    : result,
              ),
      }),
      branch(
        hasProp('editing'),
        onPropsChange(
          ['editing'],
          ({ editing, edit, cancel, buffer }) =>
            editing
              ? buffer === undefined && edit()
              : buffer !== undefined && cancel(),
        ),
      ),
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
