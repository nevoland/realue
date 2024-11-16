[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ItemCallable

# Interface: ItemCallable()\<T, E\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Param

The index of the item for which to generate the props.

## Type Parameters

• **T**

• **E** *extends* [`ErrorReport`](../type-aliases/ErrorReport.md)\<`any`\>

> **ItemCallable**(`itemIndex`): [`ItemProps`](../type-aliases/ItemProps.md)\<`T`, `E`\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Parameters

• **itemIndex**: `number`

## Returns

[`ItemProps`](../type-aliases/ItemProps.md)\<`T`, `E`\>

## Param

The index of the item for which to generate the props.

## Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:14](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L14)
=======
[lib/types/ItemCallable.ts:14](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L14)
>>>>>>> origin/main

> **ItemCallable**(): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`[], [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`[], [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

## Param

The index of the item for which to generate the props.

## Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:15](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L15)
=======
[lib/types/ItemCallable.ts:15](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L15)
>>>>>>> origin/main

## Properties

### add()

> `readonly` **add**: (`item`, `index`?) => `void`

Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.

#### Parameters

• **item**: `T`

The item to add.

• **index?**: `number` \| \`$\{number\}\`

The index where to add this item.

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:33](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L33)
=======
[lib/types/ItemCallable.ts:33](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L33)
>>>>>>> origin/main

***

### get()

> `readonly` **get**: (`index`) => `undefined` \| `T`

Retreives the item found at the specified `index`.

#### Parameters

• **index**: `number` \| \`$\{number\}\`

The index of the item to retreive, or `undefined` if none was found.

#### Returns

`undefined` \| `T`

#### Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:45](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L45)
=======
[lib/types/ItemCallable.ts:45](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L45)
>>>>>>> origin/main

***

### loop()

> `readonly` **loop**: \<`P`\>(`Component`, `extraProps`?) => (`null` \| `VNode`\<`any`\>)[]

Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.

#### Type Parameters

• **P** *extends* `object`

#### Parameters

• **Component**: `FunctionComponent`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`, `E`\> & `object` & `P`\>

• **extraProps?**: `P` \| (`props`) => `P`

An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add.

#### Returns

(`null` \| `VNode`\<`any`\>)[]

An array containing the produced elements out of `Component`.

#### Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:23](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L23)
=======
[lib/types/ItemCallable.ts:23](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L23)
>>>>>>> origin/main

***

### remove()

> `readonly` **remove**: (`index`) => `void`

Removes the item found at the specified `index`.

#### Parameters

• **index**: `number` \| \`$\{number\}\`

The index of the item to remove.

#### Returns

`void`

#### Defined in

<<<<<<< HEAD
[lib/types/ItemCallable.ts:39](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/types/ItemCallable.ts#L39)
=======
[lib/types/ItemCallable.ts:39](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/types/ItemCallable.ts#L39)
>>>>>>> origin/main
