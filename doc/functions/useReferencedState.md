[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useReferencedState

# Function: useReferencedState()

> **useReferencedState**\<`T`\>(`value`): readonly [`MutableRef`\<`T`\>, (`value`) => `void`]

Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

Initial value.

## Returns

readonly [`MutableRef`\<`T`\>, (`value`) => `void`]

A couple containing the reference to the current state value, and the state updater function.

## Defined in

[lib/hooks/useReferencedState.ts:15](https://github.com/nevoland/realue/blob/bda2c81a122722d2211255b398b35c625b1e6a1c/lib/hooks/useReferencedState.ts#L15)
