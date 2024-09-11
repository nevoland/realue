[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useReferencedState

# Function: useReferencedState()

> **useReferencedState**\<`T`\>(`value`): readonly [`MutableRef`\<`T`\>, `Dispatch`\<`StateUpdater`\<`T`\>\>]

Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

Initial value.

## Returns

readonly [`MutableRef`\<`T`\>, `Dispatch`\<`StateUpdater`\<`T`\>\>]

A couple containing the reference to the current state value, and the state updater function.

## Defined in

[lib/hooks/useReferencedState.ts:9](https://github.com/nevoland/realue/blob/f5d92f5c2955b3005b70a2c994484a9ed93968ca/lib/hooks/useReferencedState.ts#L9)
