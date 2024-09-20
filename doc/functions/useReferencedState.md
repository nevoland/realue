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

[lib/hooks/useReferencedState.ts:15](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/hooks/useReferencedState.ts#L15)
