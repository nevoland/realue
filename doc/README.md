realue

# realue

## Table of contents

### Interfaces

- [ItemCallable](interfaces/ItemCallable.md)
- [PropertyCallbable](interfaces/PropertyCallbable.md)

### Type Aliases

- [ErrorMessage](README.md#errormessage)
- [ErrorMutator](README.md#errormutator)
- [ErrorReport](README.md#errorreport)
- [ErrorReportArray](README.md#errorreportarray)
- [ErrorReportObject](README.md#errorreportobject)
- [ItemId](README.md#itemid)
- [ItemProps](README.md#itemprops)
- [Name](README.md#name)
- [NameItem](README.md#nameitem)
- [NameProperty](README.md#nameproperty)
- [NevoProps](README.md#nevoprops)
- [ObjectProps](README.md#objectprops)
- [ValueMutator](README.md#valuemutator)
- [ValueRemover](README.md#valueremover)
- [ValueValidator](README.md#valuevalidator)

### Variables

- [EMPTY\_ARRAY](README.md#empty_array)
- [EMPTY\_OBJECT](README.md#empty_object)

### Functions

- [isEmpty](README.md#isempty)
- [logProps](README.md#logprops)
- [setItem](README.md#setitem)
- [setProperty](README.md#setproperty)
- [sleep](README.md#sleep)
- [timeout](README.md#timeout)
- [undefinedIfEmpty](README.md#undefinedifempty)
- [useArray](README.md#usearray)
- [useChange](README.md#usechange)
- [useDebounce](README.md#usedebounce)
- [useInput](README.md#useinput)
- [useObject](README.md#useobject)
- [usePromise](README.md#usepromise)
- [useRemove](README.md#useremove)
- [useSyncedSignal](README.md#usesyncedsignal)
- [useSyncedState](README.md#usesyncedstate)
- [useValidator](README.md#usevalidator)

## Type Aliases

### ErrorMessage

Ƭ **ErrorMessage**: `string`

#### Defined in

[types.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L3)

___

### ErrorMutator

Ƭ **ErrorMutator**<`E`, `N`\>: (`error`: `E` \| `undefined`, `name?`: `N` \| ``""``) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Type declaration

▸ (`error`, `name?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` \| `undefined` |
| `name?` | `N` \| ``""`` |

##### Returns

`void`

#### Defined in

[types.ts:27](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L27)

___

### ErrorReport

Ƭ **ErrorReport**<`T`, `U`\>: `U` extends `unknown`[] ? [`ErrorReportArray`](README.md#errorreportarray)<`U`\> : `U` extends `object` ? [`ErrorReportObject`](README.md#errorreportobject)<`U`\> : [`ErrorMessage`](README.md#errormessage)[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | `NonNullable`<`T`\> |

#### Defined in

[types.ts:42](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L42)

___

### ErrorReportArray

Ƭ **ErrorReportArray**<`T`\>: { [K in keyof T as number]: ErrorReport<T[K]\> } & { `?`: [`ErrorMessage`](README.md#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[types.ts:48](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L48)

___

### ErrorReportObject

Ƭ **ErrorReportObject**<`T`\>: `Partial`<{ [K in keyof T]: ErrorReport<T[K]\> }\> & { `?`: [`ErrorMessage`](README.md#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[types.ts:54](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L54)

___

### ItemId

Ƭ **ItemId**: <T\>(`index`: `number`, `item`: `T`) => `string`

#### Type declaration

▸ <`T`\>(`index`, `item`): `string`

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `item` | `T` |

##### Returns

`string`

#### Defined in

[types.ts:32](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L32)

___

### ItemProps

Ƭ **ItemProps**<`T`, `N`, `E`\>: [`NevoProps`](README.md#nevoprops)<`T`, `N`, `E`[`number`]\> & { `id`: `string` ; `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportArray`](README.md#errorreportarray)<`T`[]\> |

#### Defined in

[types.ts:88](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L88)

___

### Name

Ƭ **Name**: [`NameProperty`](README.md#nameproperty) \| [`NameItem`](README.md#nameitem)

#### Defined in

[types.ts:9](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L9)

___

### NameItem

Ƭ **NameItem**: \`${number}\`

#### Defined in

[types.ts:13](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L13)

___

### NameProperty

Ƭ **NameProperty**: `string`

#### Defined in

[types.ts:11](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L11)

___

### NevoProps

Ƭ **NevoProps**<`T`, `N`, `E`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` = [`Name`](README.md#name) |
| `E` | [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `E` |
| `name` | `N` |
| `onChange?` | [`ValueMutator`](README.md#valuemutator)<`T`, `N`\> |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)<`E`, `N`\> |
| `value` | `T` |

#### Defined in

[types.ts:34](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L34)

___

### ObjectProps

Ƭ **ObjectProps**<`T`, `E`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |
| `E` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `E` |
| `name` | [`Name`](README.md#name) |
| `onChange?` | [`ValueMutator`](README.md#valuemutator)<`T`\> |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)<`E`\> |
| `value?` | `T` |

#### Defined in

[types.ts:80](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L80)

___

### ValueMutator

Ƭ **ValueMutator**<`T`, `N`\>: (`value`: `T`, `name`: `N`) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Type declaration

▸ (`value`, `name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | `N` |

##### Returns

`void`

#### Defined in

[types.ts:20](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L20)

___

### ValueRemover

Ƭ **ValueRemover**: (`name`: [`NameItem`](README.md#nameitem)) => `void`

#### Type declaration

▸ (`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`NameItem`](README.md#nameitem) |

##### Returns

`void`

#### Defined in

[types.ts:25](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L25)

___

### ValueValidator

Ƭ **ValueValidator**<`T`, `N`\>: (`value`: `T`, `name`: `N`) => `Promise`<[`ErrorMessage`](README.md#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](README.md#errormessage)[] \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Type declaration

▸ (`value`, `name`): `Promise`<[`ErrorMessage`](README.md#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](README.md#errormessage)[] \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | `N` |

##### Returns

`Promise`<[`ErrorMessage`](README.md#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](README.md#errormessage)[] \| `undefined`

#### Defined in

[types.ts:15](https://github.com/davidbonnet/realue/blob/13744dc/lib/types.ts#L15)

## Variables

### EMPTY\_ARRAY

• `Const` **EMPTY\_ARRAY**: readonly `never`[]

#### Defined in

[constants/EMPTY_ARRAY.ts:1](https://github.com/davidbonnet/realue/blob/13744dc/lib/constants/EMPTY_ARRAY.ts#L1)

___

### EMPTY\_OBJECT

• `Const` **EMPTY\_OBJECT**: `any`

#### Defined in

[constants/EMPTY_OBJECT.ts:1](https://github.com/davidbonnet/realue/blob/13744dc/lib/constants/EMPTY_OBJECT.ts#L1)

## Functions

### isEmpty

▸ **isEmpty**<`T`\>(`value?`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | ``null`` \| `T` |

#### Returns

`boolean`

#### Defined in

[tools/isEmpty.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/isEmpty.ts#L3)

___

### logProps

▸ **logProps**(`title`, `props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `props` | `Props` |

#### Returns

`void`

#### Defined in

[tools/logProps.ts:6](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/logProps.ts#L6)

___

### setItem

▸ **setItem**<`T`\>(`array?`, `index`, `value`): `T`[]

Returns a new array with `array[index]` set to `value` if `array[index]` is strictly different from `value`. Otherwise, returns the provided `array`.
If `index` is `undefined`, a negative number, or greater than `array.length`, returns the `array` untouched.
If the `array` is `undefined`, it is considered as an `EMPTY_ARRAY`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `array` | `undefined` \| `T`[] | The array to update. |
| `index` | `undefined` \| `number` | The index of the item of the array to update. |
| `value` | `T` | The value to set the item to. |

#### Returns

`T`[]

A new updated array or the same `array` if no change was necessary.

#### Defined in

[tools/setItem.ts:13](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/setItem.ts#L13)

___

### setProperty

▸ **setProperty**<`T`, `K`\>(`object?`, `key?`, `value?`): `T`

Returns a new object with `object[key]` set to `value` if `object[key]` is strictly different from `value`. Otherwise, returns the provided `object`.
If `key` is `undefined`, returns the `object` untouched.
If `value` is `undefined`, ensures that the returned object does not contain the `key`.
If `object` is `nil`, it is considered as an `EMPTY_OBJECT`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` = keyof `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `object` | `undefined` \| `T` | `EMPTY_OBJECT` | The object to update. |
| `key?` | `K` | `undefined` | The key of the object to update. |
| `value?` | `T`[`K`] | `undefined` | The value to set the object key to. |

#### Returns

`T`

A new updated object or the same `object` if no change was necessary.

#### Defined in

[tools/setProperty.ts:15](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/setProperty.ts#L15)

___

### sleep

▸ **sleep**(`duration`, `signal?`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `number` |
| `signal?` | `AbortSignal` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[tools/sleep.ts:4](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/sleep.ts#L4)

___

### timeout

▸ **timeout**(`duration`, `callback`): () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `duration` | `number` |
| `callback` | (...`args`: `unknown`[]) => `void` |

#### Returns

`fn`

▸ (): `void`

##### Returns

`void`

#### Defined in

[tools/timeout.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/timeout.ts#L3)

___

### undefinedIfEmpty

▸ **undefinedIfEmpty**<`T`\>(`value?`): `undefined` \| `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`undefined` \| `T`

#### Defined in

[tools/undefinedIfEmpty.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/tools/undefinedIfEmpty.ts#L3)

___

### useArray

▸ **useArray**<`A`, `N`, `E`, `T`\>(`props`, `itemId?`): [`ItemCallable`](interfaces/ItemCallable.md)<`T`, `N`, `E`\>

Takes an array and returns a function that generates the required props for handling an array item value.
That function also contains three callables: `loop`, `add`, and `remove`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `undefined` \| `any`[] |
| `N` | extends `string` |
| `E` | extends [`ErrorReportArray`](README.md#errorreportarray)<`NonNullable`<`A`\>\> |
| `T` | `A` extends `H`[] ? `H` : `never` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`A`, `N`, `E`\> | `undefined` |
| `itemId` | [`ItemId`](README.md#itemid) | `itemIdDefault` |

#### Returns

[`ItemCallable`](interfaces/ItemCallable.md)<`T`, `N`, `E`\>

#### Defined in

[hooks/useArray.ts:33](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useArray.ts#L33)

___

### useChange

▸ **useChange**<`T`\>(`props`, `transformValue?`): `undefined` \| () => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `props` | `Pick`<[`NevoProps`](README.md#nevoprops)<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | `undefined` |
| `transformValue` | (`value`: `T`) => `T` | `identity` |

#### Returns

`undefined` \| () => `void`

#### Defined in

[hooks/useChange.ts:4](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useChange.ts#L4)

___

### useDebounce

▸ **useDebounce**<`T`, `N`, `E`\>(`props`, `delay?`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `E` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`, `N`, `E`\> |
| `delay?` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `error?` | `E` |
| `name` | `N` |
| `onChange` | `undefined` \| [`ValueMutator`](README.md#valuemutator)<`T`, `N`\> |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)<`E`, `N`\> |
| `value` | `T` |

#### Defined in

[hooks/useDebounce.ts:5](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useDebounce.ts#L5)

___

### useInput

▸ **useInput**<`T`, `N`\>(`props`, `extractValue`): `undefined` \| (`event`: `TargetedEvent`<`HTMLInputElement`, `Event`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Pick`<[`NevoProps`](README.md#nevoprops)<`T`, `N`\>, ``"name"`` \| ``"onChange"``\> |
| `extractValue` | (`element`: `HTMLInputElement`) => `T` |

#### Returns

`undefined` \| (`event`: `TargetedEvent`<`HTMLInputElement`, `Event`\>) => `void`

#### Defined in

[hooks/useInput.ts:4](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useInput.ts#L4)

___

### useObject

▸ **useObject**<`T`, `N`, `E`\>(`props`): [`PropertyCallbable`](interfaces/PropertyCallbable.md)<`T`, `N`, `E`\>

Takes an object and returns a function that generates the required props for handling an object property value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportObject`](README.md#errorreportobject)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`ObjectProps`](README.md#objectprops)<`T`, `E`\> |

#### Returns

[`PropertyCallbable`](interfaces/PropertyCallbable.md)<`T`, `N`, `E`\>

#### Defined in

[hooks/useObject.ts:13](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useObject.ts#L13)

___

### usePromise

▸ **usePromise**<`T`\>(): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `onChange` | (`promise?`: `T` \| `Promise`<`T`\>) => `void` |
| `promise?` | `T` \| `Promise`<`T`\> |
| `reason?` | `Error` |
| `status` | ``"idle"`` \| ``"pending"`` \| ``"fulfilled"`` \| ``"rejected"`` |
| `value?` | `T` |

#### Defined in

[hooks/usePromise.ts:17](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/usePromise.ts#L17)

___

### useRemove

▸ **useRemove**(`props`): `undefined` \| () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.name` | `string` |
| `props.onRemove?` | [`ValueRemover`](README.md#valueremover) |

#### Returns

`undefined` \| () => `void`

#### Defined in

[hooks/useRemove.ts:4](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useRemove.ts#L4)

___

### useSyncedSignal

▸ **useSyncedSignal**<`T`\>(`value`): [`T`, (`value`: `T`) => `void`]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`T`, (`value`: `T`) => `void`]

#### Defined in

[hooks/useSyncedSignal.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useSyncedSignal.ts#L3)

___

### useSyncedState

▸ **useSyncedState**<`T`\>(`value`): [`T`, (`value`: `T`) => `void`]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`T`, (`value`: `T`) => `void`]

#### Defined in

[hooks/useSyncedState.ts:3](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useSyncedState.ts#L3)

___

### useValidator

▸ **useValidator**<`T`, `N`\>(`props`, `onValidate?`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Pick`<[`NevoProps`](README.md#nevoprops)<`T`, `N`, `string`[]\>, ``"name"`` \| ``"value"`` \| ``"error"`` \| ``"onChangeError"``\> |
| `onValidate?` | [`ValueValidator`](README.md#valuevalidator)<`T`, `N`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `onChange` | (`promise?`: `string`[] \| `Promise`<`undefined` \| `string`[]\>) => `void` |
| `promise?` | `string`[] \| `Promise`<`undefined` \| `string`[]\> |
| `reason?` | `Error` |
| `status` | ``"idle"`` \| ``"pending"`` \| ``"fulfilled"`` \| ``"rejected"`` |
| `value?` | `string`[] |

#### Defined in

[hooks/useValidator.ts:5](https://github.com/davidbonnet/realue/blob/13744dc/lib/hooks/useValidator.ts#L5)
