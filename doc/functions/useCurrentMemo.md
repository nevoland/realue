[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useCurrentMemo

# Function: useCurrentMemo()

> **useCurrentMemo**\<`T`\>(`factory`, `dependencies`): `T`

Memo hook that allows for a factory function to compute the value based on the currently memoized value.

It is useful for cases where a change in dependency would result in the same computed value while producing a new reference. The factory function can then compare the current value with the new one and return the current value if they are the same, avoiding unnecessary re-renders or re-computations in subsequent hooks or components.

## Type Parameters

• **T**

## Parameters

• **factory**

Function that returns the value to memoize, receiving the currently memoized value as an argument.

• **dependencies**: `Inputs` = `[]`

Array of dependencies that will trigger a recomputation of the value when changed.

## Returns

`T`

The memoized value.

## Example

```tsx
useCurrentMemo((currentKeys) => {
 const keys = Object.keys(someObject);
 if (keys.length === currentKeys.length && keys.every((key) => someObject[key] === currentKeys[key])) {
  return currentKeys;
 }
 return keys;
}, [someObject]);
```

## Defined in

[lib/hooks/useCurrentMemo.ts:24](https://github.com/nevoland/realue/blob/131459fc0cd410aac7d8aca18b8f481f26a49eb4/lib/hooks/useCurrentMemo.ts#L24)
