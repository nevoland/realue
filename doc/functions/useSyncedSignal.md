[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedSignal

# Function: useSyncedSignal()

> **useSyncedSignal**\<`T`\>(`value`): [`T`, (`value`) => `void`]

Creates a local signal-backed state that is synced with the provided `value`.
If the provided `value` changes, the local state is set to that value.
The local state can be updated with the returned setter, which does not notify the parent.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

The provided value to sync the local state with.

## Returns

[`T`, (`value`) => `void`]

The `[value, setValue]` tuple, with `value` being the current local state and `setValue(value)` updating it.

## Defined in

[lib/hooks/useSyncedSignal.ts:11](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useSyncedSignal.ts#L11)
