# Realue

⚙️ Simple value management for React components.

### Features

- Frees developers from value handling logic so that they can focus on the user experience.
- Enforces reusable components based on `{ name, error, value, onChange(value, name), onChangeError(error, name) }` properties.
- Provides helpers for commonly used value types.

## Installation

Install with the [Node Package Manager](https://www.npmjs.com/package/realue):

```bash
npm install realue@next
```

## Usage

Everything is exported from the main entry-point through an ES6 module:

```js
import { useObject, setItem } from "realue";
```

## Documentation

Checkout the [API documentation](doc/README.md).

## Demo

A demo application can be run in the browser with:

```bash
npm run build:watch
open http://localhost:1234
```

You can then inspect and edit the code in the `demo/` folder.
