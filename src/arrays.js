import { createElement as $, Component as BaseComponent } from 'react'

import {
  setItem,
  insertItem,
  insertItems,
  lazyProperty,
  EMPTY_ARRAY,
} from './tools'

function onChangeItem(element) {
  return (itemValue, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      setItem(props.value, itemIndex, itemValue),
      props.name,
      payload,
    )
  }
}

function onAddItem(element) {
  return (itemValue, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      insertItem(props.value, itemValue, itemIndex),
      props.name,
      payload,
    )
  }
}

function onAddItems(element) {
  return (itemsValues, itemIndex, payload) => {
    const { props } = element
    return props.onChange(
      insertItems(props.value, itemsValues, itemIndex),
      props.name,
      payload,
    )
  }
}

export const array = (Component) =>
  /*
  Provides `item(index, key = index)` that returns the props for the child element responsible of the item `index`.
  Also provides `onChangeItem(value, index, payload?)` that sets the item `index` to the provided `value`, and `onAddItem(value, index, payload?)` that inserts an item with the provided `value` at `index`.
  Sets `value` to `[]` if not set.

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
  class array extends BaseComponent {
    constructor(props) {
      super(props)
      this.item = (index, key = index) => {
        const { props } = this
        return {
          key,
          value: props.value && props.value[index],
          name: index,
          onChange: props.onChange && this.onChangeItem,
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
        onAddItem: props.onChange && lazyProperty(this, 'onAddItem', onAddItem),
        onAddItems:
          props.onChange && lazyProperty(this, 'onAddItems', onAddItems),
        item: this.item,
      })
    }
  }

function onRemove(element) {
  const { props } = element
  return (payload) => props.onChange(undefined, props.name, payload)
}

export const removable = (Component) =>
  class removable extends BaseComponent {
    render() {
      const { props } = this
      return $(Component, {
        ...props,
        onRemove: props.onChange && lazyProperty(this, 'onRemove', onRemove),
      })
    }
  }
