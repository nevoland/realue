[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedState

# Function: useSyncedState()

> **useSyncedState**\<`T`\>(`value`, `setValue`?): [`T`, [`StateDispatcher`](../type-aliases/StateDispatcher.md)\<`T`\>]

Creates a state that is synced with its parent state.
If the provided `value` changes, the returned `state` is set to that provided value.
Calls to the returned `setState(state)` also trigger a call to the optionally provided `setValue(state)`.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

The provided parent state.

• **setValue?**: `Dispatch`\<`T`\>

The optional parent state updater.

## Returns

[`T`, [`StateDispatcher`](../type-aliases/StateDispatcher.md)\<`T`\>]

The `[state, setState]` tuple.

## Defined in

[lib/hooks/useSyncedState.ts:14](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useSyncedState.ts#L14)
