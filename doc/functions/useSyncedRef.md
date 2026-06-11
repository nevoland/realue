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

[lib/hooks/useSyncedRef.ts:11](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/hooks/useSyncedRef.ts#L11)
