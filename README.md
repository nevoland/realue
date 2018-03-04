# Realue

[![NPM Version](https://img.shields.io/npm/v/realue.svg)](https://www.npmjs.org/package/realue)
[![Build Status](https://travis-ci.org/davidbonnet/realue.svg?branch=master)](https://travis-ci.org/davidbonnet/realue)
[![Coverage](https://codecov.io/gh/davidbonnet/realue/branch/master/graph/badge.svg)](https://codecov.io/gh/davidbonnet/realue)
[![Dependency Status](https://david-dm.org/davidbonnet/realue/status.svg)](https://david-dm.org/davidbonnet/realue)
[![DevDependency Status](https://david-dm.org/davidbonnet/realue/dev-status.svg)](https://david-dm.org/davidbonnet/realue?type=dev)
[![Greenkeeper](https://badges.greenkeeper.io/davidbonnet/realue.svg)](https://greenkeeper.io/)

⚙️ Simple value management for React components.

### Features

* Frees developers from value handling logic so that they can focus on the user experience.
* Enforces reusable components based on `{ value, onChange(value, name, event?), name? }` properties.
* Provides helpers for commonly used value types.

## Usage

> 🏗 Under construction

> 🚧 Subject to modifications

### Types

* Structure

  * `object`
  * `array`

* Inputs

  * `boolean`
  * `number`
  * `date` 🏗
  * `string`

### Widgets

* `withFocus`
* `withKeys`
* `withSelection` 🏗

### Tools

* Value

  * `filtered`
  * `buffered`
  * `debounced`
  * `editor` 🚧 (flushable activable buffer)
  * `withDefaultValue`

* State

  * `onPropsChange`
  * `withValue`
  * `withBuffer`
  * `withPropertyBuffer`
  * `validator` 🏗
  * `timer` 🏗

* Debug

  * `logger` 🏗

## Examples

* Long press to increment counter
* Debounced input filter
* Shake on error
* Handle input errors
