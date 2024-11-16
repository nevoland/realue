[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useDefer

# Function: useDefer()

> **useDefer**\<`T`\>(`value`, `duration`?, `options`?): `T`

Returns a deferred version of the provided `value` by a given delay `duration`. If the `duration` is `undefined`, immediately returns the actual value.
Changes to the `duration` or the delay `options` will cancel the delayed invocation, if any, and call it again with the new parameters.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

Current value.

• **duration?**: `number`

The delay at which to update the value.

• **options?**: [`DelayOptions`](../type-aliases/DelayOptions.md)\<`T`\>

The delay options.

## Returns

`T`

The deferred value.

## Defined in

<<<<<<< HEAD
[lib/hooks/useDefer.ts:15](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/hooks/useDefer.ts#L15)
=======
[lib/hooks/useDefer.ts:15](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useDefer.ts#L15)
>>>>>>> origin/main
