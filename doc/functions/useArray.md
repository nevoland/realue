[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useArray

# Function: useArray()

> **useArray**\<`A`, `T`\>(`props`, `itemId`): [`ItemCallable`](../interfaces/ItemCallable.md)\<`T`\>

Takes an array and returns a function that generates the required props for handling an array item value.
That function also contains three callables: `loop`, `add`, and `remove`.

## Type Parameters

• **A** *extends* `undefined` \| readonly `any`[]

• **T** = `NonNullable`\<`A`\> *extends* readonly `H`[] ? `H` : `never`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`A`\>

Properties according to the NEVO pattern, where the `value` holds an array.

• **itemId**: [`ItemId`](../type-aliases/ItemId.md)\<`T`\> = `itemIdDefault`

An optional function that returns a unique identifier for a given array `item`.

## Returns

[`ItemCallable`](../interfaces/ItemCallable.md)\<`T`\>

The `item` function that returns the props for a specific item `index`.

## Defined in

[lib/hooks/useArray.ts:32](https://github.com/nevoland/realue/blob/83709f9838ee56af94dc6598a0bb03579ef097ee/lib/hooks/useArray.ts#L32)
