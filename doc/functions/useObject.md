[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useObject

# Function: useObject()

> **useObject**\<`T`\>(`props`): [`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

Takes an object and returns a function that generates the required props for handling an object property value.
If called without a property name, that function returns the props for the entire object, with the `error` that pertains to the entire object.

## Type Parameters

• **T** *extends* `undefined` \| `object`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern, where the `value` holds an object.

## Returns

[`PropertyCallable`](../interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

The `property` function that returns the props for a specific property `name`.

## Defined in

[lib/hooks/useObject.ts:19](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useObject.ts#L19)
