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

<<<<<<< HEAD
• **setValue?**: `Dispatch`\<`T`\>
=======
Properties according to the NEVO pattern.
>>>>>>> origin/main

## Returns

[`T`, (`value`) => `void`]

The `[state, onChangeState]` tuple.

## Defined in

<<<<<<< HEAD
[lib/hooks/useSyncedState.ts:20](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/hooks/useSyncedState.ts#L20)
=======
[lib/hooks/useSyncedState.ts:12](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useSyncedState.ts#L12)
>>>>>>> origin/main
