[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useArray

# Function: useArray()

> **useArray**\<`A`, `T`\>(`props`, `itemId`): [`ItemCallable`](../type-aliases/ItemCallable.md)\<`T`\>

Takes an array and returns a function that generates the required props for handling an array item value.
If called without an index, that function returns the props for the entire array, with the `error` that pertains to the entire array.

That function also contains three callables and two properties:
  - `loop(Component, extraProps)`: Renders each item with `Component`, passing the item props and optional extra props.
  - `add(item, index)`: Inserts an `item` at the specified `index` (defaults to the end of the array), shifting the item errors accordingly.
  - `remove(index)`: Removes the item at the specified `index`, shifting the item errors accordingly.
  - `value`: The current array value.
  - `itemId`: The function that returns the unique identifier of an item.

The `add` and `remove` callables are both `undefined` if `onChange` is not set.

## Type Parameters

• **A** *extends* `undefined` \| readonly `any`[]

• **T** = `NonNullable`\<`A`\> *extends* readonly `H`[] ? `H` : `never`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`A`\>

Properties according to the NEVO pattern, where the `value` holds an array.

• **itemId**: [`ItemId`](../type-aliases/ItemId.md)\<`T`\> = `itemIdDefault`

An optional function that returns a unique identifier for a given array `item`.

## Returns

[`ItemCallable`](../type-aliases/ItemCallable.md)\<`T`\>

The `item` function that returns the props for a specific item `index`.

## Defined in

[lib/hooks/useArray.ts:41](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useArray.ts#L41)
