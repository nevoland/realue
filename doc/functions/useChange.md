[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useChange

# Function: ~~useChange()~~

> **useChange**\<`T`\>(`props`, `transformValue`): `undefined` \| () => `void`

Returns a callback that, when called, calls `onChange(transformValue(value), name)`, or `undefined` if `onChange` is not set.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties `value`, `name`, and `onChange` according to the NEVO pattern.

• **transformValue** = `identity`

Optional function that transforms the `value` before passing it to `onChange`. Defaults to the identity function.

## Returns

`undefined` \| () => `void`

A callback that calls `onChange` with the transformed `value` and the `name`.

## Deprecated

Use `useInput` instead.

## Defined in

[lib/hooks/useChange.ts:13](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useChange.ts#L13)
