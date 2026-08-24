[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useObject

# Function: useObject()

> **useObject**\<`T`\>(`props`): [`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

Takes an object and returns a function that generates the required props for handling an object property value.

## Type Parameters

• **T** *extends* `undefined` \| `object`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern, where the `value` holds an object.

## Returns

[`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

The `property` function that returns the props for a specific property `name`.

## Defined in

[lib/hooks/useObject.ts:18](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/hooks/useObject.ts#L18)
