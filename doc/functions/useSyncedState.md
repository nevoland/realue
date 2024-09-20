[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedState

# Function: useSyncedState()

> **useSyncedState**\<`T`\>(`props`): [`T`, (`value`) => `void`]

Creates a state that is synced with its parent.
If `props.value` changes, the internal `state` is also updated.
Calls to `onChangeState(value)` trigger a call of `props.onChange(state, props.name)`.

## Type Parameters

• **T**

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

## Returns

[`T`, (`value`) => `void`]

The `[state, onChangeState]` tuple.

## Defined in

[lib/hooks/useSyncedState.ts:12](https://github.com/nevoland/realue/blob/23357baeee67e2e83a0bceccc257348ca52e5775/lib/hooks/useSyncedState.ts#L12)