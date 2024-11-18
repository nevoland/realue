[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useRemove

# Function: useRemove()

> **useRemove**(`props`): `undefined` \| () => `void`

Returns a callback that applies the provided `name` to the provided `onRemove(name)` callback.

## Parameters

• **props**

Properties `name` and `onRemove(name)`.

• **props.name**: `string`

• **props.onRemove?**: [`ValueRemover`](../type-aliases/ValueRemover.md)

## Returns

`undefined` \| () => `void`

A callback with `name` applied to `onRemove(name)`.

## Defined in

[lib/hooks/useRemove.ts:10](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/hooks/useRemove.ts#L10)
