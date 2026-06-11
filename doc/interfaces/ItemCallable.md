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

> **ItemCallable**(`itemIndex`): `object`

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Parameters

• **itemIndex**: `number`

## Returns

`object`

### error?

> `optional` **error**: `E`

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

> `optional` **onChangeError**: `NoInfer`\<[`ErrorMutator`](../type-aliases/ErrorMutator.md)\<`E`\>\>

The callback the component uses to notify the parent component about changes of the `error`.

### value

> **value**: `T`

The value to be handled by a component.

## Param

The index of the item for which to generate the props.

## Defined in

[lib/types/ItemCallable.ts:16](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L16)

> **ItemCallable**(): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`[], [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`[], [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

## Param

The index of the item for which to generate the props.

## Defined in

[lib/types/ItemCallable.ts:17](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L17)

## Properties

### add

> `readonly` **add**: [`ItemAdder`](../type-aliases/ItemAdder.md)\<`T`\>

Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.

#### Param

The item to add.

#### Param

The index where to add this item (defaults to the length of the array).

#### Defined in

[lib/types/ItemCallable.ts:35](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L35)

***

### get()

> `readonly` **get**: (`index`) => `undefined` \| `T`

Retreives the item found at the specified `index`.

#### Parameters

• **index**: `number`

The index of the item to retreive, or `undefined` if none was found.

#### Returns

`undefined` \| `T`

#### Defined in

[lib/types/ItemCallable.ts:47](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L47)

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

[lib/types/ItemCallable.ts:25](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L25)

***

### remove

> `readonly` **remove**: [`ItemRemover`](../type-aliases/ItemRemover.md)

Removes the item found at the specified `index`.

#### Param

The index of the item to remove.

#### Defined in

[lib/types/ItemCallable.ts:41](https://github.com/nevoland/realue/blob/10b81dd410f087c06fbf8ea8b1c227058ff70751/lib/types/ItemCallable.ts#L41)
