[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / omitNevoProps

# Function: omitNevoProps()

> **omitNevoProps**\<`P`\>(`props`): [`OmitNevoProps`](../type-aliases/OmitNevoProps.md)\<`P`\>

Returns the properties without the ones according to the NEVO pattern (`name`, `error`, `value`, `onChange`, and `onChangeError`).

## Type Parameters

• **P** *extends* `object`

## Parameters

• **props**: `P`

Properties according to the NEVO pattern with extra properties.

## Returns

[`OmitNevoProps`](../type-aliases/OmitNevoProps.md)\<`P`\>

The properties without the ones according to the NEVO pattern.

## Defined in

[lib/tools/omitNevoProps.ts:9](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/omitNevoProps.ts#L9)
