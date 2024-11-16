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

[lib/hooks/usePreviousArgumentList.ts:9](https://github.com/nevoland/realue/blob/61d16d842d4c11bef8dfade29a565911353a8f17/lib/hooks/usePreviousArgumentList.ts#L9)
