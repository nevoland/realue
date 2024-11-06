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

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/02eadad2b1348179ffb758c002c1a34797a6b7aa/lib/types/UseTransformOptions.ts#L7)
