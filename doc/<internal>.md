# Module: <internal\>

## Table of contents

### Interfaces

- [Error](../wiki/%3Cinternal%3E.Error)
- [ItemCallbable](../wiki/%3Cinternal%3E.ItemCallbable)
- [PropertyCallbable](../wiki/%3Cinternal%3E.PropertyCallbable)

### Type Aliases

- [ErrorMessage](../wiki/%3Cinternal%3E#errormessage)
- [ErrorMutator](../wiki/%3Cinternal%3E#errormutator)
- [ErrorReport](../wiki/%3Cinternal%3E#errorreport)
- [ErrorReportArray](../wiki/%3Cinternal%3E#errorreportarray)
- [ErrorReportObject](../wiki/%3Cinternal%3E#errorreportobject)
- [Exclude](../wiki/%3Cinternal%3E#exclude)
- [Name](../wiki/%3Cinternal%3E#name)
- [NameItem](../wiki/%3Cinternal%3E#nameitem)
- [NameProperty](../wiki/%3Cinternal%3E#nameproperty)
- [NevoProps](../wiki/%3Cinternal%3E#nevoprops)
- [NonNullable](../wiki/%3Cinternal%3E#nonnullable)
- [ObjectProps](../wiki/%3Cinternal%3E#objectprops)
- [Omit](../wiki/%3Cinternal%3E#omit)
- [Partial](../wiki/%3Cinternal%3E#partial)
- [Pick](../wiki/%3Cinternal%3E#pick)
- [Props](../wiki/%3Cinternal%3E#props)
- [Renderer](../wiki/%3Cinternal%3E#renderer)
- [ValueMutator](../wiki/%3Cinternal%3E#valuemutator)
- [ValueRemover](../wiki/%3Cinternal%3E#valueremover)
- [ValueValidator](../wiki/%3Cinternal%3E#valuevalidator)

### Functions

- [Error](../wiki/%3Cinternal%3E#error)

## Type Aliases

### ErrorMessage

Ƭ **ErrorMessage**: `string`

#### Defined in

[lib/types.ts:1](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L1)

___

### ErrorMutator

Ƭ **ErrorMutator**<`E`, `I`\>: (`error`: `E` \| `undefined`, `name?`: `I` \| ``""``) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `I` | extends `string` = [`Name`](../wiki/%3Cinternal%3E#name) |

#### Type declaration

▸ (`error`, `name?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` \| `undefined` |
| `name?` | `I` \| ``""`` |

##### Returns

`void`

#### Defined in

[lib/types.ts:25](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L25)

___

### ErrorReport

Ƭ **ErrorReport**<`T`, `N`\>: `N` extends `unknown`[] ? [`ErrorReportArray`](../wiki/%3Cinternal%3E#errorreportarray)<`N`\> : `N` extends `object` ? [`ErrorReportObject`](../wiki/%3Cinternal%3E#errorreportobject)<`N`\> : [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\> |

#### Defined in

[lib/types.ts:46](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L46)

___

### ErrorReportArray

Ƭ **ErrorReportArray**<`T`\>: { [K in keyof T as number]: ErrorReport<T[K]\> } & { `?`: [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[lib/types.ts:52](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L52)

___

### ErrorReportObject

Ƭ **ErrorReportObject**<`T`\>: [`Partial`](../wiki/%3Cinternal%3E#partial)<{ [K in keyof T]: ErrorReport<T[K]\> }\> & { `?`: [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[lib/types.ts:58](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L58)

___

### Exclude

Ƭ **Exclude**<`T`, `U`\>: `T` extends `U` ? `never` : `T`

Exclude from T those types that are assignable to U

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1606

___

### Name

Ƭ **Name**: [`NameProperty`](../wiki/%3Cinternal%3E#nameproperty) \| [`NameItem`](../wiki/%3Cinternal%3E#nameitem)

#### Defined in

[lib/types.ts:7](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L7)

___

### NameItem

Ƭ **NameItem**: \`${number}\`

#### Defined in

[lib/types.ts:11](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L11)

___

### NameProperty

Ƭ **NameProperty**: `string`

#### Defined in

[lib/types.ts:9](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L9)

___

### NevoProps

Ƭ **NevoProps**<`T`, `E`\>: { `error?`: `E` ; `name`: [`NameProperty`](../wiki/%3Cinternal%3E#nameproperty) ; `onChange?`: [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`, [`Name`](../wiki/%3Cinternal%3E#name)\> ; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<`E`, [`Name`](../wiki/%3Cinternal%3E#name)\> ; `value?`: `T`  } \| { `error?`: `E` ; `name`: [`Name`](../wiki/%3Cinternal%3E#name) ; `onChange?`: [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`, [`Name`](../wiki/%3Cinternal%3E#name)\> ; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<`E`, [`Name`](../wiki/%3Cinternal%3E#name)\> ; `value?`: `T`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | [`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`\> |

#### Defined in

[lib/types.ts:30](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L30)

___

### NonNullable

Ƭ **NonNullable**<`T`\>: `T` & {}

Exclude null and undefined from T

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1621

___

### ObjectProps

Ƭ **ObjectProps**<`T`, `E`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | `E` | - |
| `name` | [`Name`](../wiki/%3Cinternal%3E#name) | The name. |
| `onChange?` | [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`\> | - |
| `onChangeError?` | [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<`E`\> | - |
| `value?` | `T` | - |

#### Defined in

[lib/hooks/useObject.ts:35](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useObject.ts#L35)

___

### Omit

Ƭ **Omit**<`T`, `K`\>: [`Pick`](../wiki/%3Cinternal%3E#pick)<`T`, [`Exclude`](../wiki/%3Cinternal%3E#exclude)<keyof `T`, `K`\>\>

Construct a type with the properties of T except for those in type K.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `any` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1616

___

### Partial

Ƭ **Partial**<`T`\>: { [P in keyof T]?: T[P] }

Make all properties in T optional

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1571

___

### Pick

Ƭ **Pick**<`T`, `K`\>: { [P in K]: T[P] }

From T, pick a set of properties whose keys are in the union K

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1592

___

### Props

Ƭ **Props**: `Object`

#### Index signature

▪ [name: `string`]: `any`

#### Defined in

[lib/tools/logProps.ts:3](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/logProps.ts#L3)

___

### Renderer

Ƭ **Renderer**: (`index`: `number`) => `any`

#### Type declaration

▸ (`index`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

##### Returns

`any`

#### Defined in

[lib/hooks/useArray.ts:13](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L13)

___

### ValueMutator

Ƭ **ValueMutator**<`T`, `I`\>: (`value`: `T` \| `undefined`, `name`: `I`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `I` | extends `string` = [`Name`](../wiki/%3Cinternal%3E#name) |

#### Type declaration

▸ (`value`, `name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `undefined` |
| `name` | `I` |

##### Returns

`void`

#### Defined in

[lib/types.ts:18](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L18)

___

### ValueRemover

Ƭ **ValueRemover**: (`name`: [`NameItem`](../wiki/%3Cinternal%3E#nameitem)) => `void`

#### Type declaration

▸ (`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`NameItem`](../wiki/%3Cinternal%3E#nameitem) |

##### Returns

`void`

#### Defined in

[lib/types.ts:23](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L23)

___

### ValueValidator

Ƭ **ValueValidator**<`T`\>: (`value?`: `T`, `name?`: [`Name`](../wiki/%3Cinternal%3E#name)) => `Promise`<[`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value?`, `name?`): `Promise`<[`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |
| `name?` | [`Name`](../wiki/%3Cinternal%3E#name) |

##### Returns

`Promise`<[`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](../wiki/%3Cinternal%3E#errormessage)[] \| `undefined`

#### Defined in

[lib/types.ts:13](https://github.com/davidbonnet/realue/blob/084ba0c/lib/types.ts#L13)

## Functions

### Error

▸ **Error**(`message?`): [`Error`](../wiki/%3Cinternal%3E#error)

#### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

#### Returns

[`Error`](../wiki/%3Cinternal%3E#error)

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1074
