import { useState } from 'react'
import {
  stubArray,
  isArray,
  isString,
  fromPairs,
  map,
  upperFirst,
  EMPTY_OBJECT,
} from 'lodash'

import { $ } from './tools'
import { Null } from './children'
import {
  setProperty,
  setProperties,
  setItem,
  insertItem,
  EMPTY_ARRAY,
  insertItems,
} from './immutables'

export function withHook(hook, source = stubArray, result) {
  /*
  Uses the provided `hook`, with the arguments extracted from `source`,
  and reinjects the value from `result` back into the props.

  Example:

    compose(
      withProps({ initialCount: 0 }),
      withHook(useState, ['initialCount'], ['count', 'onChangeCount']),
    )(({ count, onChangeCount }) =>
      $(
        'div',
        'Count: ',
        count,
        $('button', { onClick: () => onChangeCount(count + 1) }),
      ),
    )
  */
  const sourceValues =
    source == null
      ? stubArray
      : isString(source)
      ? (props) => [props[source]]
      : isArray(source)
      ? (props) => map(source, (name) => props[name])
      : source
  const resultValues =
    result == null
      ? Null
      : isString(result)
      ? (values) => ({ [result]: values })
      : isArray(result)
      ? (values) =>
          fromPairs(map(result, (name, index) => [name, values[index]]))
      : result
  return (Component) => (props) =>
    $(Component, {
      ...props,
      ...resultValues(hook(...sourceValues(props))),
    })
}

export function useObjectProp(props, options) {
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
    errorName = `${name}Error`,
  } = name === options ? EMPTY_OBJECT : options

  const [value, onChangeValue] = useState(props[name])
  const [error, onChangeError] = useState(props[errorName])

  function onChangeProperty(name, nameName, onChangeName) {
    return (propertyValue, propertyName, payload) => {
      return props[onChangeName](
        setProperty(props[name], propertyName, propertyValue),
        props[nameName],
        payload,
      )
    }
  }

  function onChangeProperties(name, nameName, onChangeName) {
    return (values, payload) => {
      return props[onChangeName](
        setProperties(props[name], values),
        props[nameName],
        payload,
      )
    }
  }

  function property(propertyName, key = propertyName) {
    return {
      value: value[propertyName],
      error: error[propertyName],
      key,
      name: propertyName,
      onChange: (propertyValue) =>
        onChangeValue({ ...value, [propertyName]: propertyValue }),
      onChangeError: (propertyValue) =>
        onChangeError({ ...error, [propertyName]: propertyValue }),
    }
  }

  return {
    [name]: value == null ? EMPTY_OBJECT : value,
    [onChangePropertyName]:
      props[onChangeName] && onChangeProperty(name, nameName, onChangeName),
    [propertyName]: property,
    [onChangePropertiesName]:
      props[onChangeName] && onChangeProperties(name, nameName, onChangeName),
    [onChangePropertyErrorName]:
      props[onChangeErrorName] &&
      onChangeProperty(name, nameName, onChangeErrorName),
  }
}

export const useObject = (props) =>
  useObjectProp(props, {
    name: 'value',
    onChangeName: 'onChange',
    onChangeErrorName: 'onChangeError',
    onChangePropertyName: 'onChangeProperty',
    onChangePropertiesName: 'onChangeProperties',
    onChangePropertyErrorName: 'onChangePropertyError',
    propertyName: 'property',
    nameName: 'name',
    errorName: 'error',
  })

export function useArray(props) {
  function onChangeItem() {
    return (itemValue, itemIndex, payload) => {
      return props.onChange(
        setItem(
          props.value,
          itemIndex == null ? undefined : +itemIndex,
          itemValue,
        ),
        props.name,
        payload,
      )
    }
  }

  function onAddItem() {
    return (itemValue, itemIndex, payload) => {
      return props.onChange(
        insertItem(
          props.value,
          itemValue,
          itemIndex == null ? undefined : +itemIndex,
        ),
        props.name,
        payload,
      )
    }
  }

  function onAddItems() {
    return (itemsValues, itemIndex, payload) => {
      return props.onChange(
        insertItems(
          props.value,
          itemsValues,
          itemIndex == null ? undefined : +itemIndex,
        ),
        props.name,
        payload,
      )
    }
  }

  function item(index, key = index, getId = () => index) {
    return {
      key,
      value: props.value[index],
      error: props.error[getId(props.value[index])],
      name: `${index}`,
      onChange: onChangeItem(),
    }
  }

  return {
    value: props.value == null ? EMPTY_ARRAY : props.value,
    onChangeItem: props.onChange && onChangeItem(),
    onAddItem: props.onChange && onAddItem(),
    onAddItems: props.onChange && onAddItems(),
    item: item,
  }
}
