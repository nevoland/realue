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
- [ErrorReportObject](README.md#errorreportobject)
- [ErrorReportValue](README.md#errorreportvalue)
- [ErrorTransformer](README.md#errortransformer)
- [ItemId](README.md#itemid)
- [ItemProps](README.md#itemprops)
- [Name](README.md#name)
- [NameItem](README.md#nameitem)
- [NameProperty](README.md#nameproperty)
- [NeverNevoProps](README.md#nevernevoprops)
- [NevoProps](README.md#nevoprops)
- [NevoPropsAdapted](README.md#nevopropsadapted)
- [ObjectProps](README.md#objectprops)
- [OptionPropsAdapted](README.md#optionpropsadapted)
- [PromiseState](README.md#promisestate)
- [Property](README.md#property)
- [UseTransformOptions](README.md#usetransformoptions)
- [ValueMutator](README.md#valuemutator)
- [ValueRemover](README.md#valueremover)
- [ValueTransformer](README.md#valuetransformer)
- [ValueValidator](README.md#valuevalidator)

### Functions

- [adapt](README.md#adapt)
- [capitalize](README.md#capitalize)
- [disable](README.md#disable)
- [globalError](README.md#globalerror)
- [isArray](README.md#isarray)
- [itemError](README.md#itemerror)
- [itemIdDefault](README.md#itemiddefault)
- [normalize](README.md#normalize)
- [normalizeError](README.md#normalizeerror)
- [propertyError](README.md#propertyerror)
- [useArray](README.md#usearray)
- [useChange](README.md#usechange)
- [useDebounce](README.md#usedebounce)
- [useInput](README.md#useinput)
- [useLog](README.md#uselog)
- [useObject](README.md#useobject)
- [useOption](README.md#useoption)
- [usePrevious](README.md#useprevious)
- [usePreviousArgument](README.md#usepreviousargument)
- [usePreviousArgumentList](README.md#usepreviousargumentlist)
- [usePromise](README.md#usepromise)
- [useRemove](README.md#useremove)
- [useResilient](README.md#useresilient)
- [useSyncedSignal](README.md#usesyncedsignal)
- [useSyncedState](README.md#usesyncedstate)
- [useTransform](README.md#usetransform)
- [useValidator](README.md#usevalidator)

## Type Aliases

### ErrorMutator

Ƭ **ErrorMutator**<`E`, `N`\>: (`error`: `E` \| `undefined`, `name?`: `N` \| ``""``) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Type declaration

▸ (`error`, `name?`): `void`

Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` \| `undefined` |
| `name?` | `N` \| ``""`` |

##### Returns

`void`

#### Defined in

[lib/types/ErrorMutator.ts:6](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorMutator.ts#L6)

___

### ErrorReport

Ƭ **ErrorReport**<`T`, `U`\>: `U` extends `unknown`[] ? [`ErrorReportArray`](README.md#errorreportarray)<`U`\> : `U` extends `object` ? [`ErrorReportObject`](README.md#errorreportobject)<`U`\> : [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | `NonNullable`<`T`\> |

#### Defined in

[lib/types/ErrorReport.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorReport.ts#L5)

___

### ErrorReportArray

Ƭ **ErrorReportArray**<`T`\>: `Partial`<{ [K in keyof T as number]: ErrorReport<T[K]\> }\> & { `?`: [`ErrorReportValue`](README.md#errorreportvalue)  } \| [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorReportArray.ts#L4)

___

### ErrorReportObject

Ƭ **ErrorReportObject**<`T`\>: `Partial`<{ [K in keyof T]: ErrorReport<T[K]\> }\> & { `?`: [`ErrorReportValue`](README.md#errorreportvalue)  } \| [`ErrorReportValue`](README.md#errorreportvalue)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorReportObject.ts#L4)

___

### ErrorReportValue

Ƭ **ErrorReportValue**: `string`[]

#### Defined in

[lib/types/ErrorReportValue.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorReportValue.ts#L1)

___

### ErrorTransformer

Ƭ **ErrorTransformer**<`T`, `U`\>: (`error`: [`ErrorReport`](README.md#errorreport)<`T`\> \| `undefined`) => [`ErrorReport`](README.md#errorreport)<`U`\> \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Type declaration

▸ (`error`): [`ErrorReport`](README.md#errorreport)<`U`\> \| `undefined`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | [`ErrorReport`](README.md#errorreport)<`T`\> \| `undefined` |

##### Returns

[`ErrorReport`](README.md#errorreport)<`U`\> \| `undefined`

#### Defined in

[lib/types/ErrorTransformer.ts:3](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ErrorTransformer.ts#L3)

___

### ItemId

Ƭ **ItemId**<`T`\>: (`index`: `number`, `item`: `T`) => `string`

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

[lib/types/ItemId.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ItemId.ts#L1)

___

### ItemProps

Ƭ **ItemProps**<`T`, `N`\>: [`NevoProps`](README.md#nevoprops)<`T`, `N`, [`ErrorReport`](README.md#errorreport)<`T`\>\> & { `id`: `string` ; `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |

#### Defined in

[lib/types/ItemProps.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ItemProps.ts#L4)

___

### Name

Ƭ **Name**: [`NameProperty`](README.md#nameproperty) \| [`NameItem`](README.md#nameitem)

#### Defined in

[lib/types/Name.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/Name.ts#L4)

___

### NameItem

Ƭ **NameItem**: \`${number}\`

#### Defined in

[lib/types/NameItem.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/types/NameItem.ts#L1)

___

### NameProperty

Ƭ **NameProperty**: `string`

#### Defined in

[lib/types/NameProperty.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/types/NameProperty.ts#L1)

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

[lib/types/NeverNevoProps.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/NeverNevoProps.ts#L4)

___

### NevoProps

Ƭ **NevoProps**<`T`, `N`, `E`\>: `Object`

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
| `N` | extends `string` = [`Name`](README.md#name) |
| `E` | [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | `E` | An error object describing issues to be shown. |
| `name` | `N` | The name used to identify the entity represented by the `value`. |
| `onChange?` | [`ValueMutator`](README.md#valuemutator)<`T`, `N`\> | The callback the component uses to notify the parent component about changes of the `value`. |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)<`E`, `N`\> | The callback the component uses to notify the parent component about changes of the `error`. |
| `value` | `T` | The value to be handled by a component. |

#### Defined in

[lib/types/NevoProps.ts:14](https://github.com/nevoland/realue/blob/6d2e230/lib/types/NevoProps.ts#L14)

___

### NevoPropsAdapted

Ƭ **NevoPropsAdapted**<`T`, `K`, `N`, `E`\>: [`Property`](README.md#property)<\`${K}Name\`, `N`\> & [`Property`](README.md#property)<\`${K}Error\`, `E`\> & [`Property`](README.md#property)<`K`, `T`\> & [`Property`](README.md#property)<\`onChange${Capitalize<K\>}\`, [`ValueMutator`](README.md#valuemutator)<`T`, `N`\>\> & [`Property`](README.md#property)<\`onChange${Capitalize<K\>}Error\`, [`ErrorMutator`](README.md#errormutator)<`E`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |
| `N` | extends `string` = [`Name`](README.md#name) |
| `E` | [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Defined in

[lib/types/NevoPropsAdapted.ts:7](https://github.com/nevoland/realue/blob/6d2e230/lib/types/NevoPropsAdapted.ts#L7)

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

[lib/types/ObjectProps.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ObjectProps.ts#L5)

___

### OptionPropsAdapted

Ƭ **OptionPropsAdapted**<`T`, `K`, `N`\>: [`Property`](README.md#property)<`K`, `T`\> & [`Property`](README.md#property)<\`onChange${Capitalize<K\>}\`, [`ValueMutator`](README.md#valuemutator)<`T`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Defined in

[lib/types/OptionPropsAdapted.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/types/OptionPropsAdapted.ts#L5)

___

### PromiseState

Ƭ **PromiseState**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise?` | `Promise`<`T` \| `undefined`\> |
| `reason?` | `Error` |
| `status` | `PromiseStatus` |
| `value?` | `T` |

#### Defined in

lib/types/PromiseState.ts:3

___

### Property

Ƭ **Property**<`K`, `V`\>: { [P in K]: { [Q in P]: V } }[`K`]

Returns an object type with a single property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `PropertyKey` |
| `V` | `V` |

#### Defined in

[lib/types/Property.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/types/Property.ts#L4)

___

### UseTransformOptions

Ƭ **UseTransformOptions**<`T`, `U`\>: { `onChange`: [`ValueTransformer`](README.md#valuetransformer)<`U`, `T`\> ; `value`: [`ValueTransformer`](README.md#valuetransformer)<`T`, `U`\>  } & { `error`: [`ErrorTransformer`](README.md#errortransformer)<`T`, `U`\> ; `onChangeError`: [`ErrorTransformer`](README.md#errortransformer)<`U`, `T`\>  } \| { `error?`: `never` ; `onChangeError?`: `never`  }

Options for `useTransform`.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[lib/types/UseTransformOptions.ts:7](https://github.com/nevoland/realue/blob/6d2e230/lib/types/UseTransformOptions.ts#L7)

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

Function that changes a `value`. Used as the signature for the `onChange` callback of the NEVO pattern.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | `N` |

##### Returns

`void`

#### Defined in

[lib/types/ValueMutator.ts:6](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ValueMutator.ts#L6)

___

### ValueRemover

Ƭ **ValueRemover**: (`name`: [`NameItem`](README.md#nameitem)) => `void`

#### Type declaration

▸ (`name`): `void`

Function that removes an array item at index `name`.

##### Parameters

| Name | Type |
| :------ | :------ |
| `name` | [`NameItem`](README.md#nameitem) |

##### Returns

`void`

#### Defined in

[lib/types/ValueRemover.ts:6](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ValueRemover.ts#L6)

___

### ValueTransformer

Ƭ **ValueTransformer**<`T`, `U`\>: (`value`: `T`) => `U`

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

[lib/types/ValueTransformer.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ValueTransformer.ts#L1)

___

### ValueValidator

Ƭ **ValueValidator**<`T`, `N`\>: (`value`: `T`, `name`: `N`) => `Promise`<[`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`\> \| [`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Type declaration

▸ (`value`, `name`): `Promise`<[`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`\> \| [`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | `N` |

##### Returns

`Promise`<[`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`\> \| [`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Defined in

[lib/types/ValueValidator.ts:7](https://github.com/nevoland/realue/blob/6d2e230/lib/types/ValueValidator.ts#L7)

## Functions

### adapt

▸ **adapt**<`T`, `K`\>(`props`, `propertyName`): [`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\>

Adapts the provided `props` to the specified `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | Properties according to the Nevo pattern. |
| `propertyName` | `K` | Name of the value property. |

#### Returns

[`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\>

**`Example`**

```tsx
<SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
```

#### Defined in

[lib/tools/adapt.ts:17](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/adapt.ts#L17)

___

### capitalize

▸ **capitalize**<`T`\>(`value`): `Capitalize`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Capitalize`<`T`\>

#### Defined in

[lib/tools/capitalize.ts:1](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/capitalize.ts#L1)

___

### disable

▸ **disable**<`T`\>(`props`, `condition`): [`NevoProps`](README.md#nevoprops)<`T`\>

Updates the props following the NEVO pattern by removing the callbacks to disable changes if `condition` is truthy.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | Props following the NEVO pattern. |
| `condition` | `boolean` | Boolean that disables changes if true. |

#### Returns

[`NevoProps`](README.md#nevoprops)<`T`\>

The props necessary to disable changes or not.

#### Defined in

[lib/tools/disable.ts:10](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/disable.ts#L10)

___

### globalError

▸ **globalError**<`T`\>(`error?`): [`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Returns

[`ErrorReportValue`](README.md#errorreportvalue) \| `undefined`

#### Defined in

[lib/tools/globalError.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/globalError.ts#L5)

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

node_modules/typescript/lib/lib.es5.d.ts:1505

___

### itemError

▸ **itemError**<`T`\>(`error?`): `Partial`<{ [K in keyof T as number]: ErrorReport<T[K]\> }\> \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReportArray`](README.md#errorreportarray)<`T`\> |

#### Returns

`Partial`<{ [K in keyof T as number]: ErrorReport<T[K]\> }\> \| `undefined`

#### Defined in

[lib/tools/itemError.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/itemError.ts#L5)

___

### itemIdDefault

▸ **itemIdDefault**<`T`\>(`index`, `item`): `string`

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

[lib/tools/itemIdDefault.ts:8](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/itemIdDefault.ts#L8)

___

### normalize

▸ **normalize**<`T`, `K`\>(`props`, `propertyName`): [`NevoProps`](README.md#nevoprops)<`T`\>

Normalizes the provided `props` from the provided `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\> | Propertyes according to the Nevo pattern. |
| `propertyName` | `K` | Name of the value property. |

#### Returns

[`NevoProps`](README.md#nevoprops)<`T`\>

**`Example`**

```tsx
<SomeComponent {...normalize("option", props)} />
```

#### Defined in

[lib/tools/normalize.ts:17](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/normalize.ts#L17)

___

### normalizeError

▸ **normalizeError**<`T`\>(`error`): `undefined` \| [`ErrorReportValue`](README.md#errorreportvalue) \| [`ErrorReport`](README.md#errorreport)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `undefined` \| [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Returns

`undefined` \| [`ErrorReportValue`](README.md#errorreportvalue) \| [`ErrorReport`](README.md#errorreport)<`T`\>

#### Defined in

[lib/tools/normalizeError.ts:14](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/normalizeError.ts#L14)

___

### propertyError

▸ **propertyError**<`T`\>(`error?`): `Partial`<{ [K in keyof T]: ErrorReport<T[K]\> }\> \| `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | [`ErrorReportObject`](README.md#errorreportobject)<`T`\> |

#### Returns

`Partial`<{ [K in keyof T]: ErrorReport<T[K]\> }\> \| `undefined`

#### Defined in

[lib/tools/propertyError.ts:5](https://github.com/nevoland/realue/blob/6d2e230/lib/tools/propertyError.ts#L5)

___

### useArray

▸ **useArray**<`A`, `N`, `E`, `T`\>(`props`, `itemId?`): [`ItemCallable`](interfaces/ItemCallable.md)<`T`, `N`\>

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`A`, `N`, `E`\> | `undefined` | The props holding the array `value`. |
| `itemId` | [`ItemId`](README.md#itemid)<`T`\> | `itemIdDefault` | An optional function that returns a unique identifier for a given array `item`. |

#### Returns

[`ItemCallable`](interfaces/ItemCallable.md)<`T`, `N`\>

The `item` function that returns the props for a specific item `index`.

#### Defined in

[lib/hooks/useArray.ts:60](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useArray.ts#L60)

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

[lib/hooks/useChange.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useChange.ts#L4)

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `error?` | `E` | An error object describing issues to be shown. |
| `name` | `N` | The name used to identify the entity represented by the `value`. |
| `onChange` | `undefined` \| [`ValueMutator`](README.md#valuemutator)<`T`, `N`\> | - |
| `onChangeError?` | [`ErrorMutator`](README.md#errormutator)<`E`, `N`\> | The callback the component uses to notify the parent component about changes of the `error`. |
| `value` | `T` | - |

#### Defined in

[lib/hooks/useDebounce.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useDebounce.ts#L4)

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

[lib/hooks/useInput.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useInput.ts#L4)

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

[lib/hooks/useLog.ts:6](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useLog.ts#L6)

___

### useObject

▸ **useObject**<`T`, `N`, `E`\>(`props`): [`PropertyCallable`](interfaces/PropertyCallable.md)<`T`, `N`\>

Takes an object and returns a function that generates the required props for handling an object property value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportObject`](README.md#errorreportobject)<`T`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ObjectProps`](README.md#objectprops)<`T`, `E`\> | The props holding the object `value`. |

#### Returns

[`PropertyCallable`](interfaces/PropertyCallable.md)<`T`, `N`\>

The `property` function that returns the props for a specific property `name`.

#### Defined in

[lib/hooks/useObject.ts:41](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useObject.ts#L41)

___

### useOption

▸ **useOption**<`T`, `K`\>(`props`, `propertyName`): [`OptionPropsAdapted`](README.md#optionpropsadapted)<`T`, `K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | Properties according to the Nevo pattern. |
| `propertyName` | `K` |  |

#### Returns

[`OptionPropsAdapted`](README.md#optionpropsadapted)<`T`, `K`\>

#### Defined in

[lib/hooks/useOption.ts:10](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useOption.ts#L10)

___

### usePrevious

▸ **usePrevious**<`T`\>(`value`): `undefined` \| `T`

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

[lib/hooks/usePrevious.ts:9](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/usePrevious.ts#L9)

___

### usePreviousArgument

▸ **usePreviousArgument**<`T`, `U`\>(`callback`): (`value`: `T`) => `U`

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

[lib/hooks/usePreviousArgument.ts:9](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/usePreviousArgument.ts#L9)

___

### usePreviousArgumentList

▸ **usePreviousArgumentList**<`T`, `U`\>(`callback`): (...`current`: `T`) => `U`

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

[lib/hooks/usePreviousArgumentList.ts:9](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/usePreviousArgumentList.ts#L9)

___

### usePromise

▸ **usePromise**<`T`\>(`promise?`): [`PromiseState`](README.md#promisestate)<`T`\>

Returns a promise state object to track the provided `promise`.
Ignores outdated promises or ones that resolve when the component got unmounted.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `promise?` | `T` \| `Promise`<`T`\> | The promise to track. |

#### Returns

[`PromiseState`](README.md#promisestate)<`T`\>

A promise state object

#### Defined in

[lib/hooks/usePromise.ts:18](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/usePromise.ts#L18)

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

[lib/hooks/useRemove.ts:4](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useRemove.ts#L4)

___

### useResilient

▸ **useResilient**<`T`\>(`value`, `trigger?`): `T`

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

[lib/hooks/useResilient.ts:11](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useResilient.ts#L11)

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

[lib/hooks/useSyncedSignal.ts:3](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useSyncedSignal.ts#L3)

___

### useSyncedState

▸ **useSyncedState**<`T`\>(`props`): [`T`, (`value`: `T`) => `void`]

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
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | The NEVO props. |

#### Returns

[`T`, (`value`: `T`) => `void`]

The `[state, onChangeState]` tuple.

#### Defined in

[lib/hooks/useSyncedState.ts:12](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useSyncedState.ts#L12)

___

### useTransform

▸ **useTransform**<`T`, `U`\>(`props`, `options`): [`NevoProps`](README.md#nevoprops)<`U`\>

Transforms the incoming `value` and the outgoing `value` passed to the `onChange` callback, and optionally the incoming `error` and the outgoing `error` passed to the `onChangeError` callback. If the incoming and outgoing `error` transforms are not provided, returned props will not contain `error` nor `onChangeError`.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | The props holding the `value` and `onChange` callbacks. |
| `options` | [`UseTransformOptions`](README.md#usetransformoptions)<`T`, `U`\> | Options for `useTransform`. |

#### Returns

[`NevoProps`](README.md#nevoprops)<`U`\>

Updated props.

#### Defined in

[lib/hooks/useTransform.ts:17](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useTransform.ts#L17)

___

### useValidator

▸ **useValidator**<`T`, `N`\>(`props`, `onValidate?`): [`PromiseState`](README.md#promisestate)<`undefined` \| [`ErrorReportValue`](README.md#errorreportvalue)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `N` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Pick`<[`NevoProps`](README.md#nevoprops)<`T`, `N`, [`ErrorReportValue`](README.md#errorreportvalue)\>, ``"name"`` \| ``"value"`` \| ``"error"`` \| ``"onChangeError"``\> |
| `onValidate?` | [`ValueValidator`](README.md#valuevalidator)<`T`, `N`\> |

#### Returns

[`PromiseState`](README.md#promisestate)<`undefined` \| [`ErrorReportValue`](README.md#errorreportvalue)\>

#### Defined in

[lib/hooks/useValidator.ts:7](https://github.com/nevoland/realue/blob/6d2e230/lib/hooks/useValidator.ts#L7)
