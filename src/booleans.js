import { $, setWrapperName } from './tools'

export const boolean = (Component) =>
  /*
  Sets `value` to `false` if `nil`.
  */
  setWrapperName(Component, function boolean(props) {
    return $(
      Component,
      props.value != null
        ? props
        : {
            ...props,
            value: false,
          },
    )
  })
