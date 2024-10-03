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

• **setValue?**: `Dispatch`\<`StateUpdater`\<`T`\>\>

## Returns

[`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

The `[state, setState]` tuple.

## Defined in

[lib/hooks/useSyncedState.ts:20](https://github.com/nevoland/realue/blob/1fa38fef80c9df28c076a8a44728e2fb20f56b0b/lib/hooks/useSyncedState.ts#L20)
