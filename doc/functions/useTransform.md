[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useTransform

# Function: useTransform()

> **useTransform**\<`T`, `U`\>(`props`, `options`, `dependencies`): [`NevoProps`](../type-aliases/NevoProps.md)\<`U`\>

Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback.

If the incoming and outgoing `error` transforms are not provided, the returned `error` and `onChangeError` props are `undefined`.

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

[lib/hooks/useTransform.ts:20](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useTransform.ts#L20)
