import { Component as BaseComponent } from 'react'
import { mapKeys } from 'lodash'

import { $, lazyProperty, setWrapperName } from './tools'
import {
  setItem,
  setProperty,
  insertItem,
  insertItems,
  EMPTY_ARRAY,
} from './immutables'

function onChangeItem(element) {
  return (itemValue, itemName, payload) => {
    const { props } = element
    if (
      itemValue === undefined &&
      props.onChangeError != null &&
      itemName != null
    ) {
      const itemIndex = +itemName
      props.onChangeError(
        mapKeys(
          setProperty(props.error, itemName, undefined),
          (value, name) => {
            if (name === '') {
              return ''
            }
            const index = +name
            if (index > itemIndex) {
              return `${index - 1}`
            }
            return name
          },
        ),
        props.name,
        payload,
      )
    }
    return props.onChange(
      (value) =>
        setItem(value, itemName == null ? undefined : +itemName, itemValue),
      props.name,
      payload,
    )
  }
}

// TODO: Reuse lazy function setter from properties
function onChangeItemError(element) {
  return (errorValue, itemName, payload) => {
    const { props } = element
    return props.onChangeError(
      setProperty(props.error, itemName, errorValue),
      props.name,
      payload,
    )
  }
}

function onAddItem(element) {
  return (itemValue, itemName, payload) => {
    const { props } = element
    if (itemName != null && props.onChangeError != null) {
      const itemIndex = +itemName
      props.onChangeError(
        mapKeys(
          setProperty(props.error, itemName, undefined),
          (value, name) => {
            if (name === '') {
              return ''
            }
            const index = +name
            if (index >= itemIndex) {
              return `${index + 1}`
            }
            return name
          },
        ),
        props.name,
        payload,
      )
    }
    return props.onChange(
      insertItem(
        props.value,
        itemValue,
        itemName == null ? undefined : +itemName,
      ),
      props.name,
      payload,
    )
  }
}

function onAddItems(element) {
  return (itemsValues, itemName, payload) => {
    const { props } = element
    if (itemName != null && props.onChangeError != null) {
      const itemIndex = +itemName
      const { length } = itemsValues
      props.onChangeError(
        mapKeys(
          setProperty(props.error, itemName, undefined),
          (value, name) => {
            if (name === '') {
              return ''
            }
            const index = +name
            if (index >= itemIndex) {
              return `${index + length}`
            }
            return name
          },
        ),
        props.name,
        payload,
      )
    }
    return props.onChange(
      insertItems(
        props.value,
        itemsValues,
        itemName == null ? undefined : +itemName,
      ),
      props.name,
      payload,
    )
  }
}

export const array = (Component) =>
  /*
  Provides `item(index, key = index)` that returns the props for the child element responsible of the item `index`.
  Also provides `onChangeItem(value, index, payload?)` that sets the item `index` to the provided `value`, and `onAddItem(value, index, payload?)` that inserts an item with the provided `value` at `index`.
  Sets `value` to `[]` if `nil`.

  Example:
    const List = array(({ value, item, onAdd }) => (
      <ul>
        {map(value, (_, index) => <li>{item(index)}</li>)}
        <li>
          <button onClick={() => onAdd('New')}>Add</button>
        </li>
      </ul>
    ))
  */
  setWrapperName(
    Component,
    class array extends BaseComponent {
      constructor(props) {
        super(props)
        this.item = (index, key = index) => {
          const { props } = this
          const value = props.value && props.value[index]
          const id = typeof key === 'function' ? key(value) : key
          return {
            key: id,
            value,
            error: props.error && props.error[index],
            name: `${index}`,
            onChange:
              props.onChange &&
              lazyProperty(this, 'onChangeItem', onChangeItem),
            onChangeError:
              props.onChangeError &&
              lazyProperty(this, 'onChangeItemError', onChangeItemError),
          }
        }
      }
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          value: props.value == null ? EMPTY_ARRAY : props.value,
          onChangeItem:
            props.onChange && lazyProperty(this, 'onChangeItem', onChangeItem),
          onAddItem:
            props.onChange && lazyProperty(this, 'onAddItem', onAddItem),
          onAddItems:
            props.onChange && lazyProperty(this, 'onAddItems', onAddItems),
          item: this.item,
        })
      }
    },
  )

function onRemove(element) {
  return (payload) => {
    const { props } = element
    return props.onChange(undefined, props.name, payload)
  }
}

export const removable = (Component) =>
  setWrapperName(
    Component,
    class removable extends BaseComponent {
      render() {
        const { props } = this
        return $(Component, {
          ...props,
          onRemove: props.onChange && lazyProperty(this, 'onRemove', onRemove),
        })
      }
    },
  )
