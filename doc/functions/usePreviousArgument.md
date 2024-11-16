[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / usePreviousArgument

# Function: usePreviousArgument()

> **usePreviousArgument**\<`T`, `U`\>(`callback`): (`value`) => `U`

Returns a unary callback that calls the provided `callback` with both the current and previous value of the argument. Can be used for computations that require working with the previous value.

## Type Parameters

• **T**

• **U**

## Parameters

• **callback**

The callback that receives both the current and previous value of the argument.

## Returns

`Function`

A callback that receives the argument value and returns the result of the provided `callback`.

### Parameters

• **value**: `T`

### Returns

`U`

## Defined in

[lib/hooks/usePreviousArgument.ts:9](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/hooks/usePreviousArgument.ts#L9)
