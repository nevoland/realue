[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useObject

# Function: useObject()

> **useObject**\<`T`, `E`\>(`props`): [`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

Takes an object and returns a function that generates the required props for handling an object property value.

## Type Parameters

• **T** *extends* `undefined` \| `object`

• **E** *extends* [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\> = [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\>

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`, `E`\>

Properties according to the NEVO pattern, where the `value` holds an object.

## Returns

[`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

The `property` function that returns the props for a specific property `name`.

## Defined in

[lib/hooks/useObject.ts:13](https://github.com/nevoland/realue/blob/02eadad2b1348179ffb758c002c1a34797a6b7aa/lib/hooks/useObject.ts#L13)
