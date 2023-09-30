[realue](../README.md) / ItemCallable

# Interface: ItemCallable<T, N, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportArray`](../README.md#errorreportarray)<`T`[]\> |

## Callable

### ItemCallable

▸ **ItemCallable**(`itemIndex`): [`ItemProps`](../README.md#itemprops)<`T`, `N`, `E`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemIndex` | `number` |

#### Returns

[`ItemProps`](../README.md#itemprops)<`T`, `N`, `E`\>

#### Defined in

[types.ts:94](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L94)

### ItemCallable

▸ **ItemCallable**(): [`NevoProps`](../README.md#nevoprops)<`T`[], `N`, `E`[``""``]\>

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`[], `N`, `E`[``""``]\>

#### Defined in

[types.ts:95](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L95)

## Table of contents

### Properties

- [add](ItemCallable.md#add)
- [loop](ItemCallable.md#loop)
- [remove](ItemCallable.md#remove)

## Properties

### add

• `Readonly` **add**: (`item`: `T`, `index?`: `number` \| \`${number}\`) => `void`

#### Type declaration

▸ (`item`, `index?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `T` |
| `index?` | `number` \| \`${number}\` |

##### Returns

`void`

#### Defined in

[types.ts:99](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L99)

___

### loop

• `Readonly` **loop**: (`component`: `FunctionComponent`<[`ItemProps`](../README.md#itemprops)<`T`, `N`, `E`\>\>) => (``null`` \| `VNode`<`any`\>)[]

#### Type declaration

▸ (`component`): (``null`` \| `VNode`<`any`\>)[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `component` | `FunctionComponent`<[`ItemProps`](../README.md#itemprops)<`T`, `N`, `E`\>\> |

##### Returns

(``null`` \| `VNode`<`any`\>)[]

#### Defined in

[types.ts:96](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L96)

___

### remove

• `Readonly` **remove**: (`index`: `number` \| \`${number}\`) => `void`

#### Type declaration

▸ (`index`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` \| \`${number}\` |

##### Returns

`void`

#### Defined in

[types.ts:100](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L100)
