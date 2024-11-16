[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useReferencedState

# Function: useReferencedState()

## useReferencedState(value)

> **useReferencedState**\<`T`\>(`value`): `ReferenceStateResult`\<`T`\>

Same as `useState`, but returns the value in a reference to use it in callbacks without having to regenerate them.

### Type Parameters

• **T**

### Parameters

• **value**: `T`

Initial value.

### Returns

`ReferenceStateResult`\<`T`\>

A couple containing the reference to the current state value, and the state updater function.

### Defined in

[lib/hooks/useReferencedState.ts:15](https://github.com/nevoland/realue/blob/4e20bc322d155f810c06416a8a99a0b7b6c6ba28/lib/hooks/useReferencedState.ts#L15)

## useReferencedState()

> **useReferencedState**\<`T`\>(): `ReferenceStateResult`\<`T` \| `undefined`\>

### Type Parameters

• **T** = `undefined`

### Returns

`ReferenceStateResult`\<`T` \| `undefined`\>

### Defined in

[lib/hooks/useReferencedState.ts:16](https://github.com/nevoland/realue/blob/4e20bc322d155f810c06416a8a99a0b7b6c6ba28/lib/hooks/useReferencedState.ts#L16)
