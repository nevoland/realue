[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedRef

# Function: useSyncedRef()

> **useSyncedRef**\<`T`\>(`value`): `MutableRef`\<`T`\>

Returns a stable reference that is synced with the provided `value`.

Removes the need for callbacks to be dependent on often changing values, thus avoiding frequent redefinitions.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

The value to put in the reference.

## Returns

`MutableRef`\<`T`\>

The reference set to the provided value.

## Defined in

[lib/hooks/useSyncedRef.ts:11](https://github.com/nevoland/realue/blob/1154642196b245a82a5b956ce38ff24ded07b589/lib/hooks/useSyncedRef.ts#L11)
