[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useResilient

# Function: useResilient()

> **useResilient**\<`T`\>(`value`, `shouldUpdate`): `T`

Returns the provided `value` if `shouldUpdate` is strictly equal to `true` or, when called with the new value and the current one, returns `true`. Otherwise, returns the current one.
By default, `shouldUpdate` returns `true` if `value` is not `undefined`.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

The `value` to make resilient.

• **shouldUpdate**: `boolean` \| (`nextValue`, `currentValue`) => `boolean` = `...`

Either a falsy value, `true`, or a function that is called with the new value and the current one and returns a boolean value.

## Returns

`T`

The current value, last udpated when `shouldUpdate` was `true` or returned `true`.

## Defined in

[lib/hooks/useResilient.ts:11](https://github.com/nevoland/realue/blob/439801296602d9ef58e3e6fbfd3252b0bea604d8/lib/hooks/useResilient.ts#L11)
