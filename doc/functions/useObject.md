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

[lib/hooks/useObject.ts:18](https://github.com/nevoland/realue/blob/ae52e491a42ea548f37572294c8879745c3e1bb1/lib/hooks/useObject.ts#L18)
