[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / UseTransformOptions

# Type Alias: UseTransformOptions\<T, U\>

> **UseTransformOptions**\<`T`, `U`\>: `object` & `object` \| `object`

Options for `useTransform`.

## Type declaration

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

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/f0861eda689780090ad24f17b0b38643f5880cf7/lib/types/UseTransformOptions.ts#L7)
