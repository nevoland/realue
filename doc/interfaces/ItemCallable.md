[realue](../README.md) / ItemCallable

# Interface: ItemCallable\<T, N\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |

## Callable

### ItemCallable

▸ **ItemCallable**(`itemIndex`): [`ItemProps`](../README.md#itemprops)\<`T`, \`$\{number}\`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemIndex` | `number` |

#### Returns

[`ItemProps`](../README.md#itemprops)\<`T`, \`$\{number}\`\>

#### Defined in

[lib/types/ItemCallable.ts:14](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/ItemCallable.ts#L14)

### ItemCallable

▸ **ItemCallable**(): [`NevoProps`](../README.md#nevoprops)\<`T`[], `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Returns

[`NevoProps`](../README.md#nevoprops)\<`T`[], `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Defined in

[lib/types/ItemCallable.ts:15](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/ItemCallable.ts#L15)

## Table of contents

### Properties

- [add](ItemCallable.md#add)
- [loop](ItemCallable.md#loop)
- [remove](ItemCallable.md#remove)

## Properties

### add

• `Readonly` **add**: (`item`: `T`, `index?`: `number` \| \`$\{number}\`) => `void`

Inserts an item at the specified index, shifting by one the previous item found at this index and its subsequent ones.

#### Type declaration

▸ (`item`, `index?`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `T` | The item to add. |
| `index?` | `number` \| \`$\{number}\` | The index where to add this item. |

##### Returns

`void`

#### Defined in

[lib/types/ItemCallable.ts:33](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/ItemCallable.ts#L33)

___

### loop

• `Readonly` **loop**: (`Component`: `FunctionComponent`\<[`ItemProps`](../README.md#itemprops)\<`T`, `N`\>\>, `extraProps?`: {} \| (`props`: [`ItemProps`](../README.md#itemprops)\<`T`, `N`\>) => {}) => (``null`` \| `VNode`\<`any`\>)[]

Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.

#### Type declaration

▸ (`Component`, `extraProps?`): (``null`` \| `VNode`\<`any`\>)[]

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component` | `FunctionComponent`\<[`ItemProps`](../README.md#itemprops)\<`T`, `N`\>\> |  |
| `extraProps?` | {} \| (`props`: [`ItemProps`](../README.md#itemprops)\<`T`, `N`\>) => {} | An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add. |

##### Returns

(``null`` \| `VNode`\<`any`\>)[]

#### Defined in

[lib/types/ItemCallable.ts:23](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/ItemCallable.ts#L23)

___

### remove

• `Readonly` **remove**: (`index`: `number` \| \`$\{number}\`) => `void`

Removes the item found at the specified `index`.

#### Type declaration

▸ (`index`): `void`

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` \| \`$\{number}\` | The index of the item to remove. |

##### Returns

`void`

#### Defined in

[lib/types/ItemCallable.ts:39](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/ItemCallable.ts#L39)
