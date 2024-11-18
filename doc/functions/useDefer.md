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

[lib/hooks/useDefer.ts:15](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/hooks/useDefer.ts#L15)
