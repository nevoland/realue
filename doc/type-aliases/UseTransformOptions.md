[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / UseTransformOptions

# Type Alias: UseTransformOptions\<T, U\>

> **UseTransformOptions**\<`T`, `U`\>: `object` & `object` \| `object`

Options for `useTransform`.

## Type declaration

### cache?

> `optional` **cache**: `boolean`

If `true`, caches the latest transforms from `value` and `onChange` and returns them if identical values are presented.

⚠️ Only enable the cache if the `value(value)` transform is bijective and `onChange(value)` is the complete inverse function, i.e., `value(onChange(data))` deeply equals `data`.

### onChange

> **onChange**: [`ValueTransformer`](ValueTransformer.md)\<`U`, `T`\>

Transforms the outgoing `value` passed to the `onChange` callback.

#### Param

The outgoing `value` to transform.

### value

> **value**: [`ValueTransformer`](ValueTransformer.md)\<`T`, `U`\>

Transform the incoming `value`.

#### Param

The incoming `value` to transform.

## Type Parameters

• **T**

• **U**

## Defined in

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/bd94583533dfd64901173bd4809940f1a6c957d9/lib/types/UseTransformOptions.ts#L7)
