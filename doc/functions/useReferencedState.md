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

[lib/hooks/useReferencedState.ts:22](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/hooks/useReferencedState.ts#L22)

## useReferencedState()

> **useReferencedState**\<`T`\>(): `ReferenceStateResult`\<`T` \| `undefined`\>

### Type Parameters

• **T** = `undefined`

### Returns

`ReferenceStateResult`\<`T` \| `undefined`\>

### Defined in

[lib/hooks/useReferencedState.ts:23](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/hooks/useReferencedState.ts#L23)
