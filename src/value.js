import { compose, branch, withHandlers } from 'recompose'

const hasOnChange = ({ onChange }) => onChange != null

export function value(Component) {
  return compose(
    branch(
      hasOnChange,
      compose(
        withHandlers({
          onChange: ({ value, name: id = value, onChange }) => (value, event) =>
            onChange(value, id, event),
          onEvent: ({ value, name: id = value, onChange }) => event =>
            onChange(event.target.value, id, event),
        }),
      ),
    ),
  )(Component)
}
