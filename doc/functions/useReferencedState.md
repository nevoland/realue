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

[lib/hooks/useReferencedState.ts:15](https://github.com/nevoland/realue/blob/74648764502b1dc82cd067678d4f4e304253ebad/lib/hooks/useReferencedState.ts#L15)

## useReferencedState()

> **useReferencedState**\<`T`\>(): `ReferenceStateResult`\<`T` \| `undefined`\>

### Type Parameters

• **T** = `undefined`

### Returns

`ReferenceStateResult`\<`T` \| `undefined`\>

### Defined in

[lib/hooks/useReferencedState.ts:16](https://github.com/nevoland/realue/blob/74648764502b1dc82cd067678d4f4e304253ebad/lib/hooks/useReferencedState.ts#L16)
