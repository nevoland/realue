[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedState

# Function: useSyncedState()

## useSyncedState(value)

> **useSyncedState**\<`T`\>(`value`): [`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

Creates a state that is synced with its parent state.
If the provided `state` changes, the returned `state` is set to that provided state.
Calls to the returned `setState(state)` also triggers a call to the optionally provided `setState(state)`.

### Type Parameters

• **T**

### Parameters

• **value**: `T`

### Returns

[`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

The `[state, setState]` tuple.

### Defined in

[lib/hooks/useSyncedState.ts:21](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/hooks/useSyncedState.ts#L21)

## useSyncedState(value, setValue)

> **useSyncedState**\<`T`\>(`value`, `setValue`): [`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

### Type Parameters

• **T**

### Parameters

• **value**: `T`

• **setValue**: `Dispatch`\<`StateUpdater`\<`T`\>\>

### Returns

[`T`, `Dispatch`\<`StateUpdater`\<`T`\>\>]

### Defined in

[lib/hooks/useSyncedState.ts:22](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/hooks/useSyncedState.ts#L22)
