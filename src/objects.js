import { Component as BaseComponent } from 'react'
import { reduce, join, pick, isString, upperFirst } from 'lodash'
import { compose, branch, withHandlers } from 'recompose'

import { setProperty, setProperties, EMPTY_OBJECT } from './immutables'
import { $, hasProp, lazyProperty, setWrapperName } from './tools'

function onChangeProperty(element, name, nameName, onChangeName) {
  return (propertyValue, propertyName, payload) => {
    const { props } = element
    return props[onChangeName](
      setProperty(props[name], propertyName, propertyValue),
      props[nameName],
      payload,
    )
  }
}

function onChangeProperties(element, name, nameName, onChangeName) {
  return (values, payload) => {
    const { props } = element
    return props[onChangeName](
      setProperties(props[name], values),
      props[nameName],
      payload,
    )
  }
}

export function objectProp(options) {
  /*
  Provides `[propertyName](name, key = name)` that returns the props for the child element responsible of the property `name` of the object at `[name]`.
  Also provides `[onChangePropertyName](value, name, payload?)` that sets the property `name` of the object at `[name]` to the provided `value`, and `[onChangePropertiesName](values, payload?)` that merges the provided `values` into the object at `[name]`.
  Sets `[name]` to `{}` if `nil`.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    onChangeName = `onChange${capitalizedName}`,
    onChangeErrorName = `onChange${capitalizedName}Error`,
    onChangePropertyName = `onChange${capitalizedName}Property`,
    onChangePropertyErrorName = `onChange${capitalizedName}PropertyError`,
    onChangePropertiesName = `onChange${capitalizedName}Properties`,
    propertyName = `${name}Property`,
    nameName = `${name}Name`,
    // NOTE: Add destination options
  } = name === options ? EMPTY_OBJECT : options
  return (Component) =>
    setWrapperName(
      Component,
      class objectProp extends BaseComponent {
        constructor(props) {
          super(props)
          this.property = (propertyName, key = propertyName) => {
            const { props } = this
            const value = props[name]
            const error = props.error
            return {
              value: value && value[propertyName],
              error: error && error[propertyName],
              key,
              name: propertyName,
              onChange: props[onChangeName] && this.onChangeProperty,
              onChangeError:
                props[onChangeErrorName] && this.onChangePropertyError,
            }
          }
        }
        render() {
          const { props } = this
          const value = props[name]
          return $(Component, {
            ...props,
            [name]: value == null ? EMPTY_OBJECT : value,
            [onChangePropertyName]:
              props[onChangeName] &&
              lazyProperty(
                this,
                'onChangeProperty',
                onChangeProperty,
                name,
                nameName,
                onChangeName,
              ),
            [onChangePropertiesName]:
              props[onChangeName] &&
              lazyProperty(
                this,
                'onChangeProperties',
                onChangeProperties,
                name,
                nameName,
                onChangeName,
              ),
            [propertyName]: this.property,
            [onChangePropertyErrorName]:
              props[onChangeErrorName] &&
              lazyProperty(
                this,
                'onChangePropertyError',
                onChangeProperty,
                name,
                nameName,
                onChangeErrorName,
              ),
          })
        }
      },
    )
}

/*
Provides `property(name, key = name)` that returns the props for the child element responsible of the property `name`.
Also provides `onChangeProperty(value, name, payload?)` that sets the property `name` to the provided `value`.
Sets `value` to `{}` if `nil`.
*/
export const object = objectProp({
  name: 'value',
  onChangeName: 'onChange',
  onChangeErrorName: 'onChangeError',
  onChangePropertyName: 'onChangeProperty',
  onChangePropertiesName: 'onChangeProperties',
  onChangePropertyErrorName: 'onChangePropertyError',
  propertyName: 'property',
  nameName: 'name',
})

export const splittable = compose(
  /*
  Enables dispatching a subset of properties to a child element.
  */
  branch(
    hasProp('onChange'),
    withHandlers({
      onChangeProperties:
        ({ value, name, onChange }) =>
        (propertyValues, propertyNames, payload) =>
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
    properties:
      ({ value, onChangeProperties: onChange }) =>
      (names, key = join(names, '-')) => ({
        value: pick(value, names),
        key,
        name: names,
        onChange,
      }),
  }),
)
