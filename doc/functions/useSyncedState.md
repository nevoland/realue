[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedState

# Function: useSyncedState()

> **useSyncedState**\<`T`\>(`value`, `setValue`?): [`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

Creates a state that is synced with its parent state.
If the provided `state` changes, the returned `state` is set to that provided state.
Calls to the returned `setState(state)` also triggers a call to the optionally provided `setState(state)`.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

• **setValue?**: `Dispatch`\<`T`\>

## Returns

[`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

The `[state, setState]` tuple.

## Defined in

[lib/hooks/useSyncedState.ts:20](https://github.com/nevoland/realue/blob/02eadad2b1348179ffb758c002c1a34797a6b7aa/lib/hooks/useSyncedState.ts#L20)
