[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedState

# Function: useSyncedState()

> **useSyncedState**\<`T`\>(`value`, `setValue`?): [`T`, [`StateDispatcher`](../type-aliases/StateDispatcher.md)\<`T`\>]

Creates a state that is synced with its parent state.
If the provided `state` changes, the returned `state` is set to that provided state.
Calls to the returned `setState(state)` also triggers a call to the optionally provided `setState(state)`.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

• **setValue?**: `Dispatch`\<`T`\>

## Returns

[`T`, [`StateDispatcher`](../type-aliases/StateDispatcher.md)\<`T`\>]

The `[state, setState]` tuple.

## Defined in

[lib/hooks/useSyncedState.ts:14](https://github.com/nevoland/realue/blob/1154642196b245a82a5b956ce38ff24ded07b589/lib/hooks/useSyncedState.ts#L14)
