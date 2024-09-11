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

[lib/hooks/usePreviousArgument.ts:9](https://github.com/nevoland/realue/blob/f4b19517a70849cd9acdbd330ff073726e13ba1f/lib/hooks/usePreviousArgument.ts#L9)
