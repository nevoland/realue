[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useTransform

# Function: useTransform()

> **useTransform**\<`T`, `U`\>(`props`, `options`): [`NevoProps`](../type-aliases/NevoProps.md)\<`U`\>

Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback. If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.

## Type Parameters

• **T**

• **U**

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

• **options**: [`UseTransformOptions`](../type-aliases/UseTransformOptions.md)\<`T`, `U`\>

Options for `useTransform`.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`U`\>

Updated properties according to the NEVO pattern.

## Defined in

[lib/hooks/useTransform.ts:17](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/hooks/useTransform.ts#L17)
