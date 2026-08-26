[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ItemCallable

# Interface: ItemCallable()\<T\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Param

The index of the item for which to generate the props.

## Type Parameters

• **T**

> **ItemCallable**(`itemIndex`): `object`

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Parameters

• **itemIndex**: `number`

## Returns

`object`

### error?

> `optional` **error**: `NoInfer`\<[`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\>\>

An error object describing issues to be shown.

### id

> **id**: `string`

### key

> **key**: `string`

### name

> **name**: `string`

The name used to identify the entity represented by the `value`.

### onChange?

> `optional` **onChange**: `NoInfer`\<[`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\>\>

The callback the component uses to notify the parent component about changes of the `value`.

### onChangeError?

> `optional` **onChangeError**: `NoInfer`\<[`ErrorMutator`](../type-aliases/ErrorMutator.md)\<`T`\>\>

The callback the component uses to notify the parent component about changes of the `error`.

### value

> **value**: `T`

The value to be handled by a component.

## Param

The index of the item for which to generate the props.

## Defined in

[lib/types/ItemCallable.ts:15](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L15)

> **ItemCallable**(): [`NevoProps`](../type-aliases/NevoProps.md)\<readonly `T`[]\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<readonly `T`[]\>

## Param

The index of the item for which to generate the props.

## Defined in

[lib/types/ItemCallable.ts:16](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L16)

## Properties

### add?

> `readonly` `optional` **add**: [`ItemAdder`](../type-aliases/ItemAdder.md)\<`T`\>

Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.

#### Param

The item to add.

#### Param

The index where to add this item (defaults to the length of the array).

#### Defined in

[lib/types/ItemCallable.ts:34](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L34)

***

### itemId

> `readonly` **itemId**: [`ItemId`](../type-aliases/ItemId.md)\<`T`\>

Returns the unique identifier of the provided `item` found at the specified `index`. Used as the `id` and `key` of the item props.

#### Param

The index of the item.

#### Param

The value of the item.

#### Defined in

[lib/types/ItemCallable.ts:52](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L52)

***

### loop()

> `readonly` **loop**: \<`P`\>(`Component`, `extraProps`?) => `ComponentChildren`[]

Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.

#### Type Parameters

• **P** *extends* `object`

#### Parameters

• **Component**: `FunctionComponent`\<`object` & `P`\>

• **extraProps?**: `P` \| (`props`) => `P`

An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.

#### Returns

`ComponentChildren`[]

An array containing the produced elements out of `Component`.

#### Defined in

[lib/types/ItemCallable.ts:24](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L24)

***

### remove?

> `readonly` `optional` **remove**: [`ItemRemover`](../type-aliases/ItemRemover.md)

Removes the item found at the specified `index`.

#### Param

The index of the item to remove.

#### Defined in

[lib/types/ItemCallable.ts:40](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L40)

***

### value

> `readonly` **value**: readonly `T`[]

Current array `value`.

#### Defined in

[lib/types/ItemCallable.ts:44](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ItemCallable.ts#L44)
