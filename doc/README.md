realue

# realue

## Table of contents

### Interfaces

- [ItemCallable](interfaces/ItemCallable.md)
- [PropertyCallable](interfaces/PropertyCallable.md)

### Type Aliases

- [ErrorMutator](README.md#errormutator)
- [ErrorReport](README.md#errorreport)
- [ErrorReportArray](README.md#errorreportarray)
- [ErrorReportChildren](README.md#errorreportchildren)
- [ErrorReportObject](README.md#errorreportobject)
- [ErrorReportValue](README.md#errorreportvalue)
- [ErrorTransformer](README.md#errortransformer)
- [Fetch](README.md#fetch)
- [ItemId](README.md#itemid)
- [ItemProps](README.md#itemprops)
- [Name](README.md#name)
- [NameItem](README.md#nameitem)
- [NameProperty](README.md#nameproperty)
- [NeverNevoProps](README.md#nevernevoprops)
- [NevoName](README.md#nevoname)
- [NevoProps](README.md#nevoprops)
- [NevoPropsAdapted](README.md#nevopropsadapted)
- [OptionPropsAdapted](README.md#optionpropsadapted)
- [PromiseState](README.md#promisestate)
- [Property](README.md#property)
- [UseTransformOptions](README.md#usetransformoptions)
- [ValueMutator](README.md#valuemutator)
- [ValueMutatorNamed](README.md#valuemutatornamed)
- [ValueRemover](README.md#valueremover)
- [ValueTransformer](README.md#valuetransformer)
- [ValueValidator](README.md#valuevalidator)

### Functions

- [adapt](README.md#adapt)
- [capitalize](README.md#capitalize)
- [changeError](README.md#changeerror)
- [childrenError](README.md#childrenerror)
- [disable](README.md#disable)
- [globalError](README.md#globalerror)
- [isArray](README.md#isarray)
- [isEqualError](README.md#isequalerror)
- [itemIdDefault](README.md#itemiddefault)
- [normalize](README.md#normalize)
- [normalizeError](README.md#normalizeerror)
- [useAbortController](README.md#useabortcontroller)
- [useArray](README.md#usearray)
- [useChange](README.md#usechange)
- [useDebounce](README.md#usedebounce)
- [useFetch](README.md#usefetch)
- [useInput](README.md#useinput)
- [useLog](README.md#uselog)
- [useMutator](README.md#usemutator)
- [useObject](README.md#useobject)
- [useOption](README.md#useoption)
- [usePrevious](README.md#useprevious)
- [usePreviousArgument](README.md#usepreviousargument)
- [usePreviousArgumentList](README.md#usepreviousargumentlist)
- [usePromise](README.md#usepromise)
- [useRemove](README.md#useremove)
- [useResilient](README.md#useresilient)
- [useSyncedProps](README.md#usesyncedprops)
- [useSyncedSignal](README.md#usesyncedsignal)
- [useSyncedState](README.md#usesyncedstate)
- [useTransform](README.md#usetransform)
- [useValidator](README.md#usevalidator)
- [withoutNevoProps](README.md#withoutnevoprops)

## Type Aliases

### ErrorMutator

Ƭ **ErrorMutator**\<`E`\>: (`error`: `E` \| `undefined`, `name`: [`Name`](README.md#name)) => `void`

Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`ErrorReport`](README.md#errorreport)\<`any`\> |

#### Type declaration

▸ (`error`, `name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` \| `undefined` |
| `name` | [`Name`](README.md#name) |

##### Returns

`void`

#### Defined in

[lib/types/ErrorMutator.ts:7](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorMutator.ts#L7)

___

### ErrorReport

Ƭ **ErrorReport**\<`T`, `U`\>: [`U`] extends [`unknown`[]] ? [`ErrorReportArray`](README.md#errorreportarray)\<`U`\> : [`U`] extends [`object`] ? [`ErrorReportObject`](README.md#errorreportobject)\<`U`\> : [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | `NonNullable`\<`T`\> |

#### Defined in

[lib/types/ErrorReport.ts:5](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorReport.ts#L5)

___

### ErrorReportArray

Ƭ **ErrorReportArray**\<`T`\>: `Partial`\<\{ [K in keyof T as number]: ErrorReport\<T[K]\> }\> & \{ `?`: [`ErrorReportValue`](README.md#errorreportvalue)  } \| [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorReportArray.ts#L4)

___

### ErrorReportChildren

Ƭ **ErrorReportChildren**\<`T`\>: `Partial`\<\{ [K in keyof T]: ErrorReport\<T[K]\> }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] \| `object` |

#### Defined in

[lib/types/ErrorReportChildren.ts:3](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorReportChildren.ts#L3)

___

### ErrorReportObject

Ƭ **ErrorReportObject**\<`T`\>: `Partial`\<\{ [K in keyof T]: ErrorReport\<T[K]\> }\> & \{ `?`: [`ErrorReportValue`](README.md#errorreportvalue)  } \| [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorReportObject.ts#L4)

___

### ErrorReportValue

Ƭ **ErrorReportValue**: `string`[]

#### Defined in

[lib/types/ErrorReportValue.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorReportValue.ts#L1)

___

### ErrorTransformer

Ƭ **ErrorTransformer**\<`T`, `U`\>: (`error`: [`ErrorReport`](README.md#errorreport)\<`T`\> \| `undefined`) => [`ErrorReport`](README.md#errorreport)\<`U`\> \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Type declaration

▸ (`error`): [`ErrorReport`](README.md#errorreport)\<`U`\> \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`ErrorReport`](README.md#errorreport)\<`T`\> \| `undefined` |

##### Returns

[`ErrorReport`](README.md#errorreport)\<`U`\> \| `undefined`

#### Defined in

[lib/types/ErrorTransformer.ts:3](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ErrorTransformer.ts#L3)

___

### Fetch

Ƭ **Fetch**\<`T`, `R`\>: (`request`: `R`, `abortController?`: `AbortController`) => `Promise`\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Type declaration

▸ (`request`, `abortController?`): `Promise`\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `R` |
| `abortController?` | `AbortController` |

##### Returns

`Promise`\<`T`\>

#### Defined in

[lib/types/Fetch.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/Fetch.ts#L1)

___

### ItemId

Ƭ **ItemId**\<`T`\>: (`index`: `number`, `item`: `T`) => `string`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`index`, `item`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `item` | `T` |

##### Returns

`string`

#### Defined in

[lib/types/ItemId.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ItemId.ts#L1)

___

### ItemProps

Ƭ **ItemProps**\<`T`, `E`\>: [`NevoProps`](README.md#nevoprops)\<`T`, `E`\> & \{ `id`: `string` ; `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`ErrorReport`](README.md#errorreport)\<`any`\> = [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Defined in

[lib/types/ItemProps.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ItemProps.ts#L4)

___

### Name

Ƭ **Name**: [`NameProperty`](README.md#nameproperty) \| [`NameItem`](README.md#nameitem)

#### Defined in

[lib/types/Name.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/Name.ts#L4)

___

### NameItem

Ƭ **NameItem**: \`$\{number}\`

#### Defined in

[lib/types/NameItem.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NameItem.ts#L1)

___

### NameProperty

Ƭ **NameProperty**: `string`

#### Defined in

[lib/types/NameProperty.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NameProperty.ts#L1)

___

### NeverNevoProps

Ƭ **NeverNevoProps**: `Object`

Excludes the props following the NEVO pattern. Useful for creating discriminated union types that enable component uses that do not necessitate the NEVO pattern.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `never` |
| `name?` | `never` |
| `onChange?` | `never` |
| `onChangeError?` | `never` |
| `value?` | `never` |

#### Defined in

[lib/types/NeverNevoProps.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NeverNevoProps.ts#L4)

___

### NevoName

Ƭ **NevoName**: keyof [`NevoProps`](README.md#nevoprops)\<`any`\>

#### Defined in

[lib/types/NevoName.ts:3](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NevoName.ts#L3)

___

### NevoProps

Ƭ **NevoProps**\<`T`, `E`\>: `Object`

Set of properties that define the NEVO pattern:
- `name`: The name used to identify the entity represented by the `value`.
- `error`: An error object describing issues to be shown.
- `value`: The value to be handled by a component.
- `onChange`: The callback the component uses to notify the parent component about changes of the `value`.
- `onChangeError`: The callback the component uses to notify the parent component about changes of the `error`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`ErrorReport`](README.md#errorreport)\<`any`\> = [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | `E` | An error object describing issues to be shown. |
| `name` | [`Name`](README.md#name) | The name used to identify the entity represented by the `value`. |
| `onChange?` | [`ValueMutator`](README.md#valuemutator)\<`NoInfer`\<`T`\>\> | The callback the component uses to notify the parent component about changes of the `value`. |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)\<`NoInfer`\<`E`\>\> | The callback the component uses to notify the parent component about changes of the `error`. |
| `value` | `T` | The value to be handled by a component. |

#### Defined in

[lib/types/NevoProps.ts:14](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NevoProps.ts#L14)

___

### NevoPropsAdapted

Ƭ **NevoPropsAdapted**\<`T`, `K`, `E`\>: [`Property`](README.md#property)\<\`$\{K}Name\`, [`Name`](README.md#name)\> & [`Property`](README.md#property)\<\`$\{K}Error\`, `E`\> & [`Property`](README.md#property)\<`K`, `T`\> & [`Property`](README.md#property)\<\`onChange$\{Capitalize\<K\>}\`, [`ValueMutator`](README.md#valuemutator)\<`T`\>\> & [`Property`](README.md#property)\<\`onChange$\{Capitalize\<K\>}Error\`, [`ErrorMutator`](README.md#errormutator)\<`E`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |
| `E` | extends [`ErrorReport`](README.md#errorreport)\<`any`\> = [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Defined in

[lib/types/NevoPropsAdapted.ts:7](https://github.com/nevoland/realue/blob/627ce6d/lib/types/NevoPropsAdapted.ts#L7)

___

### OptionPropsAdapted

Ƭ **OptionPropsAdapted**\<`T`, `K`\>: [`Property`](README.md#property)\<`K`, `T`\> & [`Property`](README.md#property)\<\`onChange$\{Capitalize\<K\>}\`, [`ValueMutator`](README.md#valuemutator)\<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Defined in

[lib/types/OptionPropsAdapted.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/OptionPropsAdapted.ts#L4)

___

### PromiseState

Ƭ **PromiseState**\<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise?` | `Promise`\<`T` \| `undefined`\> |
| `reason?` | `unknown` |
| `status` | `PromiseStatus` |
| `value?` | `T` |

#### Defined in

[lib/types/PromiseState.ts:3](https://github.com/nevoland/realue/blob/627ce6d/lib/types/PromiseState.ts#L3)

___

### Property

Ƭ **Property**\<`K`, `V`\>: \{ [P in K]: \{ [Q in P]: V } }[`K`]

Returns an object type with a single property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `PropertyKey` |
| `V` | `V` |

#### Defined in

[lib/types/Property.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/Property.ts#L4)

___

### UseTransformOptions

Ƭ **UseTransformOptions**\<`T`, `U`\>: \{ `onChange`: [`ValueTransformer`](README.md#valuetransformer)\<`U`, `T`\> ; `value`: [`ValueTransformer`](README.md#valuetransformer)\<`T`, `U`\>  } & \{ `error`: [`ErrorTransformer`](README.md#errortransformer)\<`T`, `U`\> ; `onChangeError`: [`ErrorTransformer`](README.md#errortransformer)\<`U`, `T`\>  } \| \{ `error?`: `never` ; `onChangeError?`: `never`  }

Options for `useTransform`.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/627ce6d/lib/types/UseTransformOptions.ts#L7)

___

### ValueMutator

Ƭ **ValueMutator**\<`T`\>: (`value`: `T`, `name`: [`Name`](README.md#name)) => `void`

Function that changes a `value`. Used as the signature for the `onChange` callback of the NEVO pattern.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`, `name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | [`Name`](README.md#name) |

##### Returns

`void`

#### Defined in

[lib/types/ValueMutator.ts:6](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ValueMutator.ts#L6)

___

### ValueMutatorNamed

Ƭ **ValueMutatorNamed**\<`T`\>: (`value`: `T`) => `void`

Callback that changes a `value`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

#### Defined in

[lib/types/ValueMutatorNamed.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ValueMutatorNamed.ts#L4)

___

### ValueRemover

Ƭ **ValueRemover**: (`name`: [`NameItem`](README.md#nameitem)) => `void`

Function that removes an array item at index `name`.

#### Type declaration

▸ (`name`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`NameItem`](README.md#nameitem) |

##### Returns

`void`

#### Defined in

[lib/types/ValueRemover.ts:6](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ValueRemover.ts#L6)

___

### ValueTransformer

Ƭ **ValueTransformer**\<`T`, `U`\>: (`value`: `T`) => `U`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Type declaration

▸ (`value`): `U`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`U`

#### Defined in

[lib/types/ValueTransformer.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ValueTransformer.ts#L1)

___

### ValueValidator

Ƭ **ValueValidator**\<`T`, `E`\>: (`value`: `T`, `name`: [`Name`](README.md#name), `error`: `E` \| `undefined`) => `Promise`\<`E` \| `undefined`\> \| `E` \| `undefined`

Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`ErrorReport`](README.md#errorreport)\<`any`\> = [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Type declaration

▸ (`value`, `name`, `error`): `Promise`\<`E` \| `undefined`\> \| `E` \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | [`Name`](README.md#name) |
| `error` | `E` \| `undefined` |

##### Returns

`Promise`\<`E` \| `undefined`\> \| `E` \| `undefined`

#### Defined in

[lib/types/ValueValidator.ts:6](https://github.com/nevoland/realue/blob/627ce6d/lib/types/ValueValidator.ts#L6)

## Functions

### adapt

▸ **adapt**\<`T`, `K`\>(`props`, `propertyName`): [`NevoPropsAdapted`](README.md#nevopropsadapted)\<`T`, `K`\>

Adapts the provided `props` to the specified `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`\> | Properties according to the Nevo pattern. |
| `propertyName` | `K` | Name of the value property. |

#### Returns

[`NevoPropsAdapted`](README.md#nevopropsadapted)\<`T`, `K`\>

**`Example`**

```tsx
<SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
```

#### Defined in

[lib/tools/adapt.ts:17](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/adapt.ts#L17)

___

### capitalize

▸ **capitalize**\<`T`\>(`value`): `Capitalize`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Capitalize`\<`T`\>

#### Defined in

[lib/tools/capitalize.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/capitalize.ts#L1)

___

### changeError

▸ **changeError**\<`T`, `E`\>(`error`, `itemName`, `itemError`): `E` \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `undefined` \| `object` |
| `E` | extends [`ErrorReportObject`](README.md#errorreportobject)\<`NonNullable`\<`T`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `undefined` \| `E` |
| `itemName` | ``""`` \| keyof `E` |
| `itemError` | `undefined` \| [`ErrorReportValue`](README.md#errorreportvalue) \| `E`[keyof `E`] |

#### Returns

`E` \| `undefined`

#### Defined in

[lib/tools/changeError.ts:12](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/changeError.ts#L12)

▸ **changeError**\<`T`, `E`\>(`error`, `itemName`, `itemError`): `E` \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `undefined` \| `any`[] |
| `E` | extends [`ErrorReportArray`](README.md#errorreportarray)\<`NonNullable`\<`T`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `undefined` \| `E` |
| `itemName` | `number` \| ``""`` |
| `itemError` | `undefined` \| [`ErrorReportValue`](README.md#errorreportvalue) \| `E`[`number`] |

#### Returns

`E` \| `undefined`

#### Defined in

[lib/tools/changeError.ts:20](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/changeError.ts#L20)

___

### childrenError

▸ **childrenError**\<`T`\>(`error?`): `Partial`\<\{ [K in keyof T as number]: ErrorReport\<T[K]\> }\> \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReportArray`](README.md#errorreportarray)\<`T`\> |

#### Returns

`Partial`\<\{ [K in keyof T as number]: ErrorReport\<T[K]\> }\> \| `undefined`

#### Defined in

[lib/tools/childrenError.ts:10](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/childrenError.ts#L10)

▸ **childrenError**\<`T`\>(`error?`): `Partial`\<\{ [K in keyof T]: ErrorReport\<T[K]\> }\> \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReportObject`](README.md#errorreportobject)\<`T`\> |

#### Returns

`Partial`\<\{ [K in keyof T]: ErrorReport\<T[K]\> }\> \| `undefined`

#### Defined in

[lib/tools/childrenError.ts:17](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/childrenError.ts#L17)

___

### disable

▸ **disable**(`condition?`): ``null`` \| \{ `onChange`: `undefined` = undefined; `onChangeError`: `undefined` = undefined }

Returns the props with `onChange` and `onChangeError` the `condition` is truthy. Useful for disabling edits in some cases.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition?` | `boolean` \| [`PromiseState`](README.md#promisestate)\<`unknown`\> | Boolean that disables changes if true, or `PromiseState` |

#### Returns

``null`` \| \{ `onChange`: `undefined` = undefined; `onChangeError`: `undefined` = undefined }

The props necessary to disable changes or not.

**`Example`**

```tsx
<>
  <Component {...props} {...disable(promiseState.status === "pending")} />
  <Component {...props} {...disable(promiseState)} />
</>
```

#### Defined in

[lib/tools/disable.ts:17](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/disable.ts#L17)

___

### globalError

▸ **globalError**\<`T`\>(`error?`): [`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Returns

[`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Defined in

[lib/tools/globalError.ts:5](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/globalError.ts#L5)

___

### isArray

▸ **isArray**(`arg`): arg is any[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `any` |

#### Returns

arg is any[]

#### Defined in

[lib/tools/isArray.ts:1](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/isArray.ts#L1)

___

### isEqualError

▸ **isEqualError**\<`T`\>(`a?`, `b?`): `boolean`

Returns `true` if the two provided error values have the same errors messages.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a?` | [`ErrorReport`](README.md#errorreport)\<`T`\> | Error value |
| `b?` | [`ErrorReport`](README.md#errorreport)\<`T`\> | Error value |

#### Returns

`boolean`

`true` if the two provided error values are equal.

#### Defined in

[lib/tools/isEqualError.ts:12](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/isEqualError.ts#L12)

___

### itemIdDefault

▸ **itemIdDefault**\<`T`\>(`index`, `item`): `string`

Default function used by `useArray` for defining the unique identifier of an item.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Array index of the item. |
| `item` | `T` | Value of the item. |

#### Returns

`string`

A unique identifier string for this item.

#### Defined in

[lib/tools/itemIdDefault.ts:8](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/itemIdDefault.ts#L8)

___

### normalize

▸ **normalize**\<`T`, `K`\>(`props`, `propertyName`): [`NevoProps`](README.md#nevoprops)\<`T`\>

Normalizes the provided `props` from the provided `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoPropsAdapted`](README.md#nevopropsadapted)\<`T`, `K`\> | Propertyes according to the Nevo pattern. |
| `propertyName` | `K` | Name of the value property. |

#### Returns

[`NevoProps`](README.md#nevoprops)\<`T`\>

**`Example`**

```tsx
<SomeComponent {...normalize("option", props)} />
```

#### Defined in

[lib/tools/normalize.ts:17](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/normalize.ts#L17)

___

### normalizeError

▸ **normalizeError**\<`T`\>(`error`): `undefined` \| [`ErrorReport`](README.md#errorreport)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `undefined` \| [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Returns

`undefined` \| [`ErrorReport`](README.md#errorreport)\<`T`\>

#### Defined in

[lib/tools/normalizeError.ts:5](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/normalizeError.ts#L5)

___

### useAbortController

▸ **useAbortController**(): () => `AbortController`

Returns a function that creates an `AbortController` and aborts the previous one (if any).
The last created `AbortController` is aborted when the component unmounts.

#### Returns

`fn`

Callback that returns a new `AbortController`.

▸ (): `AbortController`

##### Returns

`AbortController`

#### Defined in

[lib/hooks/useAbortController.ts:14](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useAbortController.ts#L14)

___

### useArray

▸ **useArray**\<`A`, `G`, `T`, `E`\>(`props`, `itemId?`): [`ItemCallable`](interfaces/ItemCallable.md)\<`T`, `E`\>

Takes an array and returns a function that generates the required props for handling an array item value.
That function also contains three callables: `loop`, `add`, and `remove`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `undefined` \| `any`[] |
| `G` | extends [`ErrorReportArray`](README.md#errorreportarray)\<`NonNullable`\<`A`\>\> |
| `T` | `A` extends `H`[] ? `H` : `never` |
| `E` | extends [`ErrorReportArray`](README.md#errorreportarray)\<`any`\> = [`ErrorReport`](README.md#errorreport)\<`T`\> |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`A`, `G`\> | `undefined` | The props holding the array `value`. |
| `itemId` | [`ItemId`](README.md#itemid)\<`T`\> | `itemIdDefault` | An optional function that returns a unique identifier for a given array `item`. |

#### Returns

[`ItemCallable`](interfaces/ItemCallable.md)\<`T`, `E`\>

The `item` function that returns the props for a specific item `index`.

#### Defined in

[lib/hooks/useArray.ts:31](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useArray.ts#L31)

___

### useChange

▸ **useChange**\<`T`\>(`props`, `transformValue?`): `undefined` \| () => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `props` | `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | `undefined` |
| `transformValue` | (`value`: `T`) => `T` | `identity` |

#### Returns

`undefined` \| () => `void`

#### Defined in

[lib/hooks/useChange.ts:4](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useChange.ts#L4)

___

### useDebounce

▸ **useDebounce**\<`T`\>(`props`, `delay?`): `Object`

Debounces calls of the value mutator `onChange` while immediately updating the local `value`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | Properties according to the NEVO pattern. |
| `delay?` | `number` | The debounce delay in milliseconds. |

#### Returns

`Object`

Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name used to identify the entity represented by the `value`. |
| `onChange` | `undefined` \| [`ValueMutator`](README.md#valuemutator)\<`T`\> | - |
| `value` | `T` | - |

#### Defined in

[lib/hooks/useDebounce.ts:16](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useDebounce.ts#L16)

___

### useFetch

▸ **useFetch**\<`T`, `Q`\>(`fetch?`, `props?`): [[`PromiseState`](README.md#promisestate)\<`T`\>, (`request?`: `Q`) => `void`]

Handles a single concurrent request and updates the `value` or `error` through the provided `onChange` and `onChangeError` callbacks. The callback in the returned tuple enables issuing new request. If the callback is called with no argument, it resets the request back to the `idle` state, aborting the prior request if it was not fulfilled.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `Q` | extends `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fetch` | [`Fetch`](README.md#fetch)\<`T`, `Q`\> | An optional request fetcher that defaults to using the standard `fetch` method. |
| `props?` | [`NevoProps`](README.md#nevoprops)\<`T`\> | The optional `onChange` and `onChangeError` callbacks to notify about the resulting `value` or `error`, and the `name`. |

#### Returns

[[`PromiseState`](README.md#promisestate)\<`T`\>, (`request?`: `Q`) => `void`]

A tuple consisting of the current request state and a callback to issue a new request.

#### Defined in

[lib/hooks/useFetch.ts:19](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useFetch.ts#L19)

___

### useInput

▸ **useInput**\<`T`\>(`props`, `extractValue`): `undefined` \| (`event`: `TargetedEvent`\<`HTMLInputElement`, `Event`\>) => `void`

Returns an event listener that, when triggered, extracts the value from the target element and provides it to the NEVO property `onChange(value, name)`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | Properties `name` and `onChange` according to the NEVO pattern. |
| `extractValue` | (`element`: `HTMLInputElement`) => `T` | Callback extracting the value from the provided target element. |

#### Returns

`undefined` \| (`event`: `TargetedEvent`\<`HTMLInputElement`, `Event`\>) => `void`

Event listener.

#### Defined in

[lib/hooks/useInput.ts:11](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useInput.ts#L11)

___

### useLog

▸ **useLog**(`title`, `props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `props` | `Props` |

#### Returns

`void`

#### Defined in

[lib/hooks/useLog.ts:6](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useLog.ts#L6)

___

### useMutator

▸ **useMutator**\<`T`\>(`props`): [`ValueMutatorNamed`](README.md#valuemutatornamed)\<`T`\> \| `undefined`

Returns a simple mutator that takes only the new `value` as argument.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | Properties `name` and `onChange` according to the NEVO pattern. |

#### Returns

[`ValueMutatorNamed`](README.md#valuemutatornamed)\<`T`\> \| `undefined`

Simple mutator that takes only the new `value` as argument.

#### Defined in

[lib/hooks/useMutator.ts:10](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useMutator.ts#L10)

___

### useObject

▸ **useObject**\<`T`, `E`\>(`props`): [`PropertyCallable`](interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

Takes an object and returns a function that generates the required props for handling an object property value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `undefined` \| `object` |
| `E` | extends [`ErrorReportObject`](README.md#errorreportobject)\<`NonNullable`\<`T`\>\> = [`ErrorReportObject`](README.md#errorreportobject)\<`NonNullable`\<`T`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`, `E`\> | The props holding the object `value`. |

#### Returns

[`PropertyCallable`](interfaces/PropertyCallable.md)\<`NonNullable`\<`T`\>\>

The `property` function that returns the props for a specific property `name`.

#### Defined in

[lib/hooks/useObject.ts:13](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useObject.ts#L13)

___

### useOption

▸ **useOption**\<`T`, `K`\>(`props`, `optionName`): [`OptionPropsAdapted`](README.md#optionpropsadapted)\<`T`, `K`\>

Renames the `value` prop to `${optionName}`, and renames the `onChange` prop to `onChange${capitalized(optionName)}` while transforming it into a simple mutator that takes only the new `value` as argument.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"value"`` \| ``"onChange"``\> | Properties according to the NEVO pattern. |
| `optionName` | `K` | The name to use for the option. |

#### Returns

[`OptionPropsAdapted`](README.md#optionpropsadapted)\<`T`, `K`\>

Properties `${optionName}` and `onChange${capitalized(optionName)}`.

#### Defined in

[lib/hooks/useOption.ts:11](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useOption.ts#L11)

___

### usePrevious

▸ **usePrevious**\<`T`\>(`value`): `undefined` \| `T`

Returns the previous value.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | Value from which to get the previous value from. |

#### Returns

`undefined` \| `T`

The previous value.

#### Defined in

[lib/hooks/usePrevious.ts:9](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/usePrevious.ts#L9)

___

### usePreviousArgument

▸ **usePreviousArgument**\<`T`, `U`\>(`callback`): (`value`: `T`) => `U`

Returns a unary callback that calls the provided `callback` with both the current and previous value of the argument. Can be used for computations that require working with the previous value.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`value`: `T`, `previousValue`: `undefined` \| `T`) => `U` | The callback that receives both the current and previous value of the argument. |

#### Returns

`fn`

A callback that receives the argument value and returns the result of the provided `callback`.

▸ (`value`): `U`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`U`

#### Defined in

[lib/hooks/usePreviousArgument.ts:9](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/usePreviousArgument.ts#L9)

___

### usePreviousArgumentList

▸ **usePreviousArgumentList**\<`T`, `U`\>(`callback`): (...`current`: `T`) => `U`

Returns a callback that calls the provided `callback` with both the current and previous value of the argument list.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any`[] |
| `U` | `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`current`: `T`, `previous`: `undefined` \| `T`) => `U` | The callback that receives both the current and previous value of the argument list. |

#### Returns

`fn`

A callback that receives the argument value list and returns the result of the provided `callback`.

▸ (`...current`): `U`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...current` | `T` |

##### Returns

`U`

#### Defined in

[lib/hooks/usePreviousArgumentList.ts:9](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/usePreviousArgumentList.ts#L9)

___

### usePromise

▸ **usePromise**\<`T`\>(`promise?`): [`PromiseState`](README.md#promisestate)\<`T`\>

Returns a promise state object to track the provided `promise`.
Ignores outdated promises or ones that resolve when the component got unmounted.
Non-promise values are immediately resolved, avoiding a second render.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise?` | `T` \| `Promise`\<`T`\> | The promise to track. |

#### Returns

[`PromiseState`](README.md#promisestate)\<`T`\>

A promise state object.

#### Defined in

[lib/hooks/usePromise.ts:19](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/usePromise.ts#L19)

___

### useRemove

▸ **useRemove**(`props`): `undefined` \| () => `void`

Returns a callback that applies the provided `name` to the provided `onRemove(name)` callback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | Properties `name` and `onRemove(name)`. |
| `props.name` | `string` | - |
| `props.onRemove?` | [`ValueRemover`](README.md#valueremover) | - |

#### Returns

`undefined` \| () => `void`

A callback with `name` applied to `onRemove(name)`.

#### Defined in

[lib/hooks/useRemove.ts:10](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useRemove.ts#L10)

___

### useResilient

▸ **useResilient**\<`T`\>(`value`, `trigger?`): `T`

Returns the provided `value` when `trigger` was truthy.
By default, `trigger` is `true` when `value` is not `undefined`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The `value` to keep a non-undefined value of. |
| `trigger` | `boolean` | The `trigger` that sets the last value if it is `truthy`. |

#### Returns

`T`

The last non-undefined version of the provided `value`, or `undefined`.

#### Defined in

[lib/hooks/useResilient.ts:11](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useResilient.ts#L11)

___

### useSyncedProps

▸ **useSyncedProps**\<`T`\>(`props?`): `Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"error"`` \| ``"value"``\> & `Required`\<`Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"onChange"`` \| ``"onChangeError"``\>\>

Creates a local state of `value` and `error` values and syncs them with the parent `props`, if provided.
Usefull if you need to handle a local state while ensuring that new values provided from the parent component are taken into consideration, or to let the parent know about `value` and `error` changes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props?` | [`NevoProps`](README.md#nevoprops)\<`T`\> | Optional properties according to the NEVO pattern. |

#### Returns

`Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"name"`` \| ``"error"`` \| ``"value"``\> & `Required`\<`Pick`\<[`NevoProps`](README.md#nevoprops)\<`T`\>, ``"onChange"`` \| ``"onChangeError"``\>\>

Properties according to the NEVO pattern.

#### Defined in

[lib/hooks/useSyncedProps.ts:11](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useSyncedProps.ts#L11)

___

### useSyncedSignal

▸ **useSyncedSignal**\<`T`\>(`value`): [`T`, (`value`: `T`) => `void`]

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

[lib/hooks/useSyncedSignal.ts:3](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useSyncedSignal.ts#L3)

___

### useSyncedState

▸ **useSyncedState**\<`T`\>(`props`): [`T`, (`value`: `T`) => `void`]

Creates a state that is synced with its parent.
If `props.value` changes, the internal `state` is also updated.
Calls to `onChangeState(value)` trigger a call of `props.onChange(state, props.name)`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`\> | Properties according to the NEVO pattern. |

#### Returns

[`T`, (`value`: `T`) => `void`]

The `[state, onChangeState]` tuple.

#### Defined in

[lib/hooks/useSyncedState.ts:12](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useSyncedState.ts#L12)

___

### useTransform

▸ **useTransform**\<`T`, `U`\>(`props`, `options`): [`NevoProps`](README.md#nevoprops)\<`U`\>

Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback. If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`\> | Properties according to the NEVO pattern. |
| `options` | [`UseTransformOptions`](README.md#usetransformoptions)\<`T`, `U`\> | Options for `useTransform`. |

#### Returns

[`NevoProps`](README.md#nevoprops)\<`U`\>

Updated properties according to the NEVO pattern.

#### Defined in

[lib/hooks/useTransform.ts:17](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useTransform.ts#L17)

___

### useValidator

▸ **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate?`): [`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

Validates the provided `value` property using the `onValidate` asynchronous callback function.
This function returns a promise state object that tracks the status of the validation process.

The `onValidate` callback function is expected to return a value or a promise that resolves with one of the following:
  - An error value indicating that validation has failed.
  - `undefined` if the validation succeeds without errors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportValue`](README.md#errorreportvalue) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`, `E`\> | Properties according to the NEVO pattern. |
| `onValidate?` | [`ValueValidator`](README.md#valuevalidator)\<`T`, `E`\> | Synchronous or asynchronous value validator. |

#### Returns

[`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

The promise state object.

#### Defined in

[lib/hooks/useValidator.ts:28](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useValidator.ts#L28)

▸ **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate?`): [`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportObject`](README.md#errorreportobject)\<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`, `E`\> |
| `onValidate?` | [`ValueValidator`](README.md#valuevalidator)\<`T`, `E`\> |

#### Returns

[`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

#### Defined in

[lib/hooks/useValidator.ts:32](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useValidator.ts#L32)

▸ **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate?`): [`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |
| `N` | extends `string` |
| `E` | extends [`ErrorReportArray`](README.md#errorreportarray)\<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)\<`T`, `E`\> |
| `onValidate?` | [`ValueValidator`](README.md#valuevalidator)\<`T`, `E`\> |

#### Returns

[`PromiseState`](README.md#promisestate)\<`E` \| `undefined`\>

#### Defined in

[lib/hooks/useValidator.ts:40](https://github.com/nevoland/realue/blob/627ce6d/lib/hooks/useValidator.ts#L40)

___

### withoutNevoProps

▸ **withoutNevoProps**\<`P`\>(`props`): `Omit`\<`P`, [`NevoName`](README.md#nevoname)\>

Returns the properties without the ones according to the Nevo pattern.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `P` | Properties according to the Nevo pattern with extra properties. |

#### Returns

`Omit`\<`P`, [`NevoName`](README.md#nevoname)\>

The propterties without the ones according to the Nevo pattern.

#### Defined in

[lib/tools/withoutNevoProps.ts:9](https://github.com/nevoland/realue/blob/627ce6d/lib/tools/withoutNevoProps.ts#L9)
