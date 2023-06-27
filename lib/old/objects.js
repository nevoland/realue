import { createElement as $, Component as BaseComponent } from 'react'
import { reduce, join, pick } from 'lodash'
import { compose, branch, withHandlers } from 'recompose'

import { setProperty, EMPTY_OBJECT } from './immutables'
import { hasProp, lazyProperty, setWrapperName } from './tools'

function onChangeProperty(element) {
  return (propertyValue, propertyName, payload) => {
    const { props } = element
    return props.onChange(
      setProperty(props.value, propertyName, propertyValue),
      props.name,
      payload,
    )
  }
}

export const object = (Component) =>
  /*
  Provides `property(name, key = name)` that returns the props for the child element responsible of the property `name`.
  Also provides `onChangeProperty(value, name, payload?)` that sets the property `name` to the provided `value`.
  Sets `value` to `{}` if `nil`.
  */
  setWrapperName(
    Component,
    class object extends BaseComponent {
      constructor(props) {
        super(props)
        this.property = (name, key = name) => {
          const { props } = this
          return {
            value: props.value && props.value[name],
            key,
            name,
            onChange: props.onChange && this.onChangeProperty,
          }
        }
      }
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          value: props.value == null ? EMPTY_OBJECT : props.value,
          onChangeProperty:
            props.onChange &&
            lazyProperty(this, 'onChangeProperty', onChangeProperty),
          property: this.property,
        })
      }
    },
  )

export const splittable = compose(
  /*
  Enables dispatching a subset of properties to a child element.
  */
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeProperties: ({ value, name, onChange }) => (
        propertyValues,
        propertyNames,
        payload,
      ) =>
        onChange(
          reduce(
            propertyNames,
            (value, propertyName) =>
              setProperty(value, propertyName, propertyValues[propertyName]),
            value,
          ),
          name,
          payload,
        ),
    }),
  ),
  withHandlers({
    properties: ({ value, onChangeProperties: onChange }) => (
      names,
      key = join(names, '-'),
    ) => ({
      value: pick(value, names),
      key,
      name: names,
      onChange,
    }),
  }),
)
