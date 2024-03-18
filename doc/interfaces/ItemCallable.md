[realue](../README.md) / ItemCallable

# Interface: ItemCallable\<T\>

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

## Type parameters

| Name |
| :------ |
| `T` |

## Callable

### ItemCallable

▸ **ItemCallable**(`itemIndex`): [`ItemProps`](../README.md#itemprops)\<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemIndex` | `number` |

#### Returns

[`ItemProps`](../README.md#itemprops)\<`T`\>

#### Defined in

[lib/types/ItemCallable.ts:13](https://github.com/nevoland/realue/blob/005032d/lib/types/ItemCallable.ts#L13)

### ItemCallable

▸ **ItemCallable**(): [`NevoProps`](../README.md#nevoprops)\<`T`[], [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Returns

[`NevoProps`](../README.md#nevoprops)\<`T`[], [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Defined in

[lib/types/ItemCallable.ts:14](https://github.com/nevoland/realue/blob/005032d/lib/types/ItemCallable.ts#L14)

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

[lib/types/ItemCallable.ts:35](https://github.com/nevoland/realue/blob/005032d/lib/types/ItemCallable.ts#L35)

___

### loop

• `Readonly` **loop**: \<P, C\>(`Component`: `C`, `extraProps?`: `P` \| (`props`: [`ItemProps`](../README.md#itemprops)\<`T`\>) => `P`) => `ReturnType`\<`C`\>[]

Returns an array that maps each item with an element out of `Component` with the NEVO props and optional extra props.

#### Type declaration

▸ \<`P`, `C`\>(`Component`, `extraProps?`): `ReturnType`\<`C`\>[]

##### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `object` |
| `C` | extends `FunctionComponent`\<[`NevoProps`](../README.md#nevoprops)\<`T`, [`ErrorReport`](../README.md#errorreport)\<`T`, `NonNullable`\<`T`\>\>\> & \{ `id`: `string` ; `key`: `string`  } & `P`\> |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `Component` | `C` |  |
| `extraProps?` | `P` \| (`props`: [`ItemProps`](../README.md#itemprops)\<`T`\>) => `P` | An object containing extra properties to add to each element, or a function that takes the items props and returns the extra properties to add. |

##### Returns

`ReturnType`\<`C`\>[]

#### Defined in

[lib/types/ItemCallable.ts:22](https://github.com/nevoland/realue/blob/005032d/lib/types/ItemCallable.ts#L22)

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

[lib/types/ItemCallable.ts:41](https://github.com/nevoland/realue/blob/005032d/lib/types/ItemCallable.ts#L41)
