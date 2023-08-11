# Interface: ItemCallbable<T, E\>

[<internal>](../wiki/%3Cinternal%3E).ItemCallbable

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`ErrorReportArray`](../wiki/%3Cinternal%3E#errorreportarray)<`T`[]\> |

## Callable

### ItemCallbable

▸ **ItemCallbable**(`itemIndex`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemIndex` | `number` |

#### Returns

`Object`

#### Defined in

[lib/hooks/useArray.ts:16](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L16)

### ItemCallbable

▸ **ItemCallbable**(): [`NevoProps`](../wiki/%3Cinternal%3E#nevoprops)<`T`[], `E`[``""``]\>

#### Returns

[`NevoProps`](../wiki/%3Cinternal%3E#nevoprops)<`T`[], `E`[``""``]\>

#### Defined in

[lib/hooks/useArray.ts:17](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L17)

## Table of contents

### Properties

- [add](../wiki/%3Cinternal%3E.ItemCallbable#add)
- [loop](../wiki/%3Cinternal%3E.ItemCallbable#loop)
- [remove](../wiki/%3Cinternal%3E.ItemCallbable#remove)

## Properties

### add

• `Readonly` **add**: (`index`: `number` \| \`${number}\`, `item`: `undefined` \| `T`) => `void`

#### Type declaration

▸ (`index`, `item`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` \| \`${number}\` |
| `item` | `undefined` \| `T` |

##### Returns

`void`

#### Defined in

[lib/hooks/useArray.ts:19](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L19)

___

### loop

• `Readonly` **loop**: (`renderer`: [`Renderer`](../wiki/%3Cinternal%3E#renderer)) => `any`[]

#### Type declaration

▸ (`renderer`): `any`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | [`Renderer`](../wiki/%3Cinternal%3E#renderer) |

##### Returns

`any`[]

#### Defined in

[lib/hooks/useArray.ts:18](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L18)

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

[lib/hooks/useArray.ts:20](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L20)
