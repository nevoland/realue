[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ValueValidator

# Type Alias: ValueValidator()\<T, E\>

> **ValueValidator**\<`T`, `E`\>: (`value`, `name`, `error`) => `Promise`\<`E` \| `undefined`\> \| `E` \| `undefined`

Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.

## Type Parameters

• **T**

• **E** *extends* [`ErrorReport`](ErrorReport.md)\<`any`\> = [`ErrorReport`](ErrorReport.md)\<`T`\>

## Parameters

• **value**: `T`

• **name**: [`Name`](Name.md)

• **error**: `E` \| `undefined`

## Returns

`Promise`\<`E` \| `undefined`\> \| `E` \| `undefined`

## Defined in

[lib/types/ValueValidator.ts:6](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ValueValidator.ts#L6)
