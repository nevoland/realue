[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / usePreviousArgumentList

# Function: usePreviousArgumentList()

> **usePreviousArgumentList**\<`T`, `U`\>(`callback`): (...`current`) => `U`

Returns a callback that calls the provided `callback` with both the current and previous value of the argument list.

## Type Parameters

• **T** *extends* `any`[]

• **U**

## Parameters

• **callback**

The callback that receives both the current and previous value of the argument list.

## Returns

`Function`

A callback that receives the argument value list and returns the result of the provided `callback`.

### Parameters

• ...**current**: `T`

### Returns

`U`

## Defined in

[lib/hooks/usePreviousArgumentList.ts:9](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/hooks/usePreviousArgumentList.ts#L9)
