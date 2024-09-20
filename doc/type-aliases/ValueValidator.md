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

[lib/types/ValueValidator.ts:6](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/types/ValueValidator.ts#L6)
