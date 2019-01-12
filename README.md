# Realue

[![NPM Version](https://img.shields.io/npm/v/realue.svg)](https://www.npmjs.org/package/realue)
[![Build Status](https://travis-ci.org/davidbonnet/realue.svg?branch=master)](https://travis-ci.org/davidbonnet/realue)
[![Coverage](https://codecov.io/gh/davidbonnet/realue/branch/master/graph/badge.svg)](https://codecov.io/gh/davidbonnet/realue)
[![Dependency Status](https://david-dm.org/davidbonnet/realue/status.svg)](https://david-dm.org/davidbonnet/realue)
[![DevDependency Status](https://david-dm.org/davidbonnet/realue/dev-status.svg)](https://david-dm.org/davidbonnet/realue?type=dev)
[![Greenkeeper](https://badges.greenkeeper.io/davidbonnet/realue.svg)](https://greenkeeper.io/)

⚙️ Simple value management for React components.

### Features

- Frees developers from value handling logic so that they can focus on the user experience.
- Enforces reusable components based on `{ value, name, onChange(value, name, payload?) }` properties.
- Provides helpers for commonly used value types.

## Contents

<!-- MarkdownTOC autolink="true" levels="2" -->

- [Installation](#installation)
- [Import](#import)
- [API](#api)
- [Demo](#demo)

<!-- /MarkdownTOC -->

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/realue):

```bash
npm install realue
```

Alternatively, checkout this repository and install the development dependencies to build the module file:

```bash
git clone https://github.com/davidbonnet/realue.git
cd realue
npm install
```

## Import

Everything is exported from the main entry-point.

With JavaScript 6 modules:

```js
import { object } from 'realue'
```

With CommonJS:

```js
const { object } = require('realue')
```

## API

### Overview

<details>
  <summary>Caption</summary>

- 🏗 Under construction: the implementation is subject to change soon
- ⬆️ Used props: `{ required, optional? }`
- ⬇️ Injected props: `{ always, optional? }`

</details>

The `realue` module exposes the following functions:

<!-- MarkdownTOC autolink="true" levels="3,4" -->

- [Value-based decorators](#value-based-decorators)
  - [`defaultValue`](#defaultvalue)
  - [`transformable`](#transformable)
  - [`filterable`](#filterable)
  - [`delayable`](#delayable)
  - [`editable`](#editable)
  - [`cyclable`](#cyclable)
  - [`toggledEditing`](#toggledediting)
  - [`fromValue(path)`](#fromvaluepath)
- [Tooling decorators](#tooling-decorators)
  - [`logProps(propNames, title?)`](#logpropspropnames-title)
  - [`omitProps(propNames)`](#omitpropspropnames)
  - [`onPropsChange(shouldHandleOrKeys, handler, callOnMount = true)`](#onpropschangeshouldhandleorkeys-handler-callonmount--true)
  - [`delayedProp({ name, delayName, onPushName } | name)`](#delayedprop-name-delayname-onpushname--%7C-name)
  - [`editableProp({ name, onChangeName? } | name)`](#editableprop-name-onchangename--%7C-name)
  - [`syncedProp({ name, onChangeName?, onPullName? } | name)`](#syncedprop-name-onchangename-onpullname--%7C-name)
  - [`cycledProp({ name, valuesName?, onCycleName?, onChangeName?, nameName? } | name)`](#cycledprop-name-valuesname-oncyclename-onchangename-namename--%7C-name)
- [Type-oriented decorators](#type-oriented-decorators)
  - [`object`](#object)
  - [`splittable`](#splittable)
  - [`array`](#array)
  - [`removable`](#removable)
  - [`boolean`](#boolean)
  - [`string`](#string)
  - [`number` 🏗](#number-%F0%9F%8F%97)
  - [`date` 🏗](#date-%F0%9F%8F%97)
- [DOM-based decorators](#dom-based-decorators)
  - [`fromEvent(path)`](#fromeventpath)
  - [`syncedFocus`](#syncedfocus)
  - [`onKeysDown(keys)`](#onkeysdownkeys)
  - [`withSelection` 🏗](#withselection-%F0%9F%8F%97)
- [Utility functions](#utility-functions)
  - [`setItem(array, index, value)`](#setitemarray-index-value)
  - [`setProperty(object, key, value)`](#setpropertyobject-key-value)
  - [`same(a, b, properties, deep = false)`](#samea-b-properties-deep--false)

<!-- /MarkdownTOC -->

### Value-based decorators

#### `defaultValue`

> ⬆️ `{ defaultValue, value }`

> ⬇️ `{ value? }`

Sets `value` to `defaultValue` if `value` is `null`.

#### `transformable`

> ⬆️ `{ transformValue?, transformOnChange? }`

> ⬇️ `{ value?, onChange? }`

Replaces `value` with the return value of `transformValue(value)`, if set.
Replaces `value` passed to `onChange(value, name, payload)` with the return value of `transformOnChange(value, name, payload)`, if set.

#### `filterable`

> ⬆️ `{ filterValue?, filterOnChange? }`

> ⬇️ `{ onPush }`

Prevents `value` update if `filterValue(value, previousValue)` is set and returns `false`.
Prevents `onChange` call if `filterOnChange(value, name, payload)` is set and returns `false`. Using `onPush` calls `onChange` unconditionally.

#### `delayable`

> ⬆️ `{ onChange, delay }`

> ⬇️ `{ onChange, onPush(value, name, payload?) }`

Delays `onChange` calls until after `delay` milliseconds have elapsed since the last call.
Renames undelayed `onChange` as `onPush`.

#### `editable`

> ⬆️ `{ value, name, onChange, onPull(value, previousValue)? }`

> ⬇️ `{ value, onChange, onPull(), onPush(payload?) }`

Enables the `value` prop to be locally editable when `onChange` is set, while staying in sync with its parent value.
The value can be updated with prop `onChange(value, name, payload)`, which triggers the parent prop `onChange`.
Calling `onPull()` sets the local value to the parent value.
The return value of the optional parent prop `onPull(newValue, previousValue)` is used on `value` changes or when calling `onPull()`.

#### `cyclable`

> ⬆️ `{ value, values?, name, onChange }`

> ⬇️ `{ onCycle(payload?) }`

Injects prop `cycle(payload)` that cycles the `value` prop through the values of `values` prop, which default to `[false, true]`. Calls `onChange(value, name, payload)`.

#### `toggledEditing`

> ⬆️ `{ editing?, onChange, onPush? }`

> ⬇️ `{ editing, onChangeEditing, onToggleEditing }`

Sets the `editing` prop and enables its toggling through the `onToggleEditing()` prop.

#### `fromValue(path)`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onChange(value) }`

Adapts `onChange` for components that call it by providing the `value` as a first argument. If the `path` is not `nil`, extracts the value from `get(value, path)`.

### Tooling decorators

#### `logProps(propNames, title?)`

Logs the provided `propNames` whenever they change.
Uses `title` as console group (defaults to decorated component name).

#### `omitProps(propNames)`

Removes provided `propNames`.

#### `onPropsChange(shouldHandleOrKeys, handler, callOnMount = true)`

Similar to `withPropsOnChange`, except that the values of the `handler` are not merged into the props.
The `handler` is called when the component is first mounted if `callOnMount` is `true` (default value).

#### `delayedProp({ name, delayName, onPushName } | name)`

> ⬆️ `{ [name], [delayName] }`

> ⬇️ `{ [name], [onPushName] }`

Delays `[name]` calls until after `[delayName]` milliseconds have elapsed since the last call.
Renames undelayed `[name]` as `onPushName`.

#### `editableProp({ name, onChangeName? } | name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [onChangeName] }`

Enables a value prop of a given `name` to be locally editable.
The value can be updated with `onChangeName`.

#### `syncedProp({ name, onChangeName?, onPullName? } | name)`

> ⬆️ `{ [name]?, [onPullName]? }`

> ⬇️ `{ [onChangeName], [onPullName] }`

Enables a prop with a given `name` to be locally editable while staying in sync with its parent value.
The prop can be updated with prop `[onChangeName](value, name, payload)`, which triggers the optional parent prop `[onChangeName]`.
Calling `[onPullName]()` sets the local value to the parent value.
The return value of the optional parent prop `[onPullName](newValue, previousValue)` is used on prop `[name]` changes or when calling `[onPullName]()`.

#### `cycledProp({ name, valuesName?, onCycleName?, onChangeName?, nameName? } | name)`

> ⬆️ `{ [name]? }`

> ⬇️ `{ [onChangeName] }`

Injects prop `[onCycleName](payload)` that cycles the value of prop `[name]` through the values found in prop `[valuesName]` which default to `[false, true]`.
Calls `[onChangeName](value, name, payload)` with `name` taken from prop `[nameName]` or `name`.

### Type-oriented decorators

#### `object`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ value?, property(name, key?), onChangeProperty(value, name, payload?) }`

Provides `property(name, key?)` that returns the props for the child element responsible of the property `name`.
Also provides `onChangeProperty(value, name, payload?)` that sets the property `name` to the provided `value`.
Sets `value` to `{}` if not set.

#### `splittable`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ properties(names, key?), onChangeProperties(values, names, payload?) }`

Enables dispatching a subset of properties to a child element.

#### `array`

> ⬆️ `{ value?, name, onChange? }`

> ⬇️ `{ value?, item(index, key = index), onChangeItem(value, index, payload?), onAdd(item, index, payload) }`

Provides `item(index, key = index)` that returns the props for the child element responsible of the item `index`.
Also provides `onChangeItem(value, index, payload?)` that sets the item `index` to the provided `value`, and `onAdd(value, index, payload?)` that inserts an item with the provided `value` at `index`.
Sets `value` to `[]` if not set.

#### `removable`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onRemove(payload?) }`

Provides `onRemove(payload?)`, which sets the value to `undefined` and results in removing the item or property.

#### `boolean`

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `false` if not set.

#### `string`

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `''` if not set.

#### `number` 🏗

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `0` if not set.

#### `date` 🏗

> ⬆️ `{ value? }`

> ⬇️ `{ value? }`

Sets `value` to `new Date(0)` if not set.

### DOM-based decorators

#### `fromEvent(path)`

> ⬆️ `{ name, onChange? }`

> ⬇️ `{ onChange(event) }`

Creates an `onChange` handler that takes the value from `get(event, path)`.
If `path` is `nil`, the value is taken from the `value` prop instead.

#### `syncedFocus`

> ⬆️ `{ focus }`

> ⬇️ `{ onFocus, onBlur }`

Exposes the synced `focus` state of an element through the `onFocus()` and `onBlur()` callbacks.

#### `onKeysDown(keys)`

> ⬆️ `{}`

> ⬇️ `{ onKeyDown }`

Triggers the specified `keys` handlers on key down. Each handler is called with the current `props`.

#### `withSelection` 🏗

### Utility functions

#### `setItem(array, index, value)`

Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
If `value` is `undefined`, ensures that the returned array does not contain the `index`.
If `index` is greater than `array.length`, appends `value` to the `array`.
If `index` equals `-1` or is `undefined`, returns the `array` untouched.

#### `setProperty(object, key, value)`

Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
If `value` is `undefined`, ensures that the returned object does not contain the `key`.
If `key` is `undefined`, returns the `object` untouched.

#### `same(a, b, properties, deep = false)`

Returns `true` if objects `a` and `b` have the same `properties`.
Unless provided, `properties` are the combined set of property names from `a` and `b`.
If `deep` is `true`, considers properties as paths (e.g., `p1.p2`).

## Demo

A demo application can be run in the browser with:

```bash
npm run build:watch
open http://localhost:1234
```

You can then inspect and edit the code in the `demo/` folder.
