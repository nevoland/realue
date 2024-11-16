[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useTransform

# Function: useTransform()

> **useTransform**\<`T`, `U`\>(`props`, `options`, `dependencies`): [`NevoProps`](../type-aliases/NevoProps.md)\<`U`\>

Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback.

If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.

## Type Parameters

• **T**

• **U**

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

• **options**: [`UseTransformOptions`](../type-aliases/UseTransformOptions.md)\<`T`, `U`\>

Options for `useTransform`.

• **dependencies**: `Inputs` = `EMPTY_ARRAY`

List of values that, when changing, update the `value`, the `error`, and the mutators.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`U`\>

Updated properties according to the NEVO pattern.

## Defined in

[lib/hooks/useTransform.ts:21](https://github.com/nevoland/realue/blob/4e20bc322d155f810c06416a8a99a0b7b6c6ba28/lib/hooks/useTransform.ts#L21)
