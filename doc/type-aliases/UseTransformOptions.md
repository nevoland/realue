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

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/ed7bf05d18ab306716405186215c6769c3cbd8d7/lib/types/UseTransformOptions.ts#L7)
