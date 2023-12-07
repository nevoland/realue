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
- [NeverNevoProps](README.md#nevernevoprops)
- [NevoProps](README.md#nevoprops)
- [NevoPropsAdapted](README.md#nevopropsadapted)
- [ObjectProps](README.md#objectprops)
- [OptionPropsAdapted](README.md#optionpropsadapted)
- [UseTransformOptions](README.md#usetransformoptions)
- [ValueMutator](README.md#valuemutator)
- [ValueRemover](README.md#valueremover)
- [ValueValidator](README.md#valuevalidator)

### Functions

- [adapt](README.md#adapt)
- [capitalize](README.md#capitalize)
- [disable](README.md#disable)
- [itemIdDefault](README.md#itemiddefault)
- [normalize](README.md#normalize)
- [useArray](README.md#usearray)
- [useChange](README.md#usechange)
- [useDebounce](README.md#usedebounce)
- [useInput](README.md#useinput)
- [useLog](README.md#uselog)
- [useObject](README.md#useobject)
- [useOption](README.md#useoption)
- [usePromise](README.md#usepromise)
- [useRemove](README.md#useremove)
- [useResilient](README.md#useresilient)
- [useSyncedSignal](README.md#usesyncedsignal)
- [useSyncedState](README.md#usesyncedstate)
- [useTransform](README.md#usetransform)
- [useValidator](README.md#usevalidator)

## Type Aliases

### ErrorMessage

Ƭ **ErrorMessage**: `string`

#### Defined in

[types.ts:5](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L5)

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

Function that mutates an `error`. Used as the signature for the `onChangeError` callback of the NEVO pattern.

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` \| `undefined` |
| `name?` | `N` \| ``""`` |

##### Returns

`void`

#### Defined in

[types.ts:46](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L46)

___

### ErrorReport

Ƭ **ErrorReport**<`T`, `U`\>: `U` extends `unknown`[] ? [`ErrorReportArray`](README.md#errorreportarray)<`U`\> : `U` extends `object` ? [`ErrorReportObject`](README.md#errorreportobject)<`U`\> : [`ErrorMessage`](README.md#errormessage)[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `U` | `NonNullable`<`T`\> |

#### Defined in

[types.ts:152](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L152)

___

### ErrorReportArray

Ƭ **ErrorReportArray**<`T`\>: { [K in keyof T as number]: ErrorReport<T[K]\> } & { `?`: [`ErrorMessage`](README.md#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |

#### Defined in

[types.ts:158](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L158)

___

### ErrorReportObject

Ƭ **ErrorReportObject**<`T`\>: `Partial`<{ [K in keyof T]: ErrorReport<T[K]\> }\> & { `?`: [`ErrorMessage`](README.md#errormessage)[]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Defined in

[types.ts:164](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L164)

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

[types.ts:51](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L51)

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

[types.ts:198](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L198)

___

### Name

Ƭ **Name**: [`NameProperty`](README.md#nameproperty) \| [`NameItem`](README.md#nameitem)

#### Defined in

[types.ts:16](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L16)

___

### NameItem

Ƭ **NameItem**: \`${number}\`

#### Defined in

[types.ts:20](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L20)

___

### NameProperty

Ƭ **NameProperty**: `string`

#### Defined in

[types.ts:18](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L18)

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

[types.ts:87](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L87)

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

[types.ts:61](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L61)

___

### NevoPropsAdapted

Ƭ **NevoPropsAdapted**<`T`, `K`, `N`, `E`\>: `Property`<\`${K}Name\`, `N`\> & `Property`<\`${K}Error\`, `E`\> & `Property`<`K`, `T`\> & `Property`<\`onChange${Capitalize<K\>}\`, [`ValueMutator`](README.md#valuemutator)<`T`, `N`\>\> & `Property`<\`onChange${Capitalize<K\>}Error\`, [`ErrorMutator`](README.md#errormutator)<`E`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |
| `N` | extends `string` = [`Name`](README.md#name) |
| `E` | [`ErrorReport`](README.md#errorreport)<`T`\> |

#### Defined in

[types.ts:95](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L95)

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

[types.ts:190](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L190)

___

### OptionPropsAdapted

Ƭ **OptionPropsAdapted**<`T`, `K`, `N`\>: `Property`<`K`, `T`\> & `Property`<\`onChange${Capitalize<K\>}\`, [`ValueMutator`](README.md#valuemutator)<`T`, `N`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |
| `N` | extends `string` = [`Name`](README.md#name) |

#### Defined in

[types.ts:146](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L146)

___

### UseTransformOptions

Ƭ **UseTransformOptions**<`T`, `U`\>: { `onChange`: (`value`: `U`) => `T` ; `value`: (`value`: `T`) => `U`  } & { `error`: (`error`: [`ErrorReport`](README.md#errorreport)<`T`\> \| `undefined`) => [`ErrorReport`](README.md#errorreport)<`U`\> \| `undefined` ; `onChangeError`: (`error`: [`ErrorReport`](README.md#errorreport)<`U`\> \| `undefined`) => [`ErrorReport`](README.md#errorreport)<`T`\> \| `undefined`  } \| `never`

Options for `useTransform`.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Defined in

[types.ts:109](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L109)

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

[types.ts:33](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L33)

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

[types.ts:41](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L41)

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

Function that valides a `value` with a given `name` and returns a promise that resolves to an error, if any.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `name` | `N` |

##### Returns

`Promise`<[`ErrorMessage`](README.md#errormessage)[] \| `undefined`\> \| [`ErrorMessage`](README.md#errormessage)[] \| `undefined`

#### Defined in

[types.ts:25](https://github.com/nevoland/realue/blob/7809fdd/lib/types.ts#L25)

## Functions

### adapt

▸ **adapt**<`T`, `K`\>(`propertyName`, `props`): [`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\>

Adapts the provided `props` to the specified `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `K` | Name of the value property. |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> | Propertyes according to the Nevo pattern. |

#### Returns

[`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\>

**`Example`**

```tsx
<SomeComponent value="example" {...adapt("option", property("option"))} />
```

#### Defined in

[tools/adapt.ts:17](https://github.com/nevoland/realue/blob/7809fdd/lib/tools/adapt.ts#L17)

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

[tools/capitalize.ts:1](https://github.com/nevoland/realue/blob/7809fdd/lib/tools/capitalize.ts#L1)

___

### disable

▸ **disable**(`condition`): ``null`` \| { `onChange`: `undefined` = undefined }

Returns the necessary props to disable changes if `condition` is truthy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | Boolean that disables changes if true. |

#### Returns

``null`` \| { `onChange`: `undefined` = undefined }

The props necessary to disable changes or not.

#### Defined in

[tools/disable.ts:7](https://github.com/nevoland/realue/blob/7809fdd/lib/tools/disable.ts#L7)

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

[tools/itemIdDefault.ts:8](https://github.com/nevoland/realue/blob/7809fdd/lib/tools/itemIdDefault.ts#L8)

___

### normalize

▸ **normalize**<`T`, `K`\>(`propertyName`, `props`): [`NevoProps`](README.md#nevoprops)<`T`\>

Normalizes the provided `props` from the provided `propertyName`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `K` | Name of the value property. |
| `props` | [`NevoPropsAdapted`](README.md#nevopropsadapted)<`T`, `K`\> | Propertyes according to the Nevo pattern. |

#### Returns

[`NevoProps`](README.md#nevoprops)<`T`\>

**`Example`**

```tsx
<SomeComponent {...normalize("option", props)} />
```

#### Defined in

[tools/normalize.ts:17](https://github.com/nevoland/realue/blob/7809fdd/lib/tools/normalize.ts#L17)

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

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `props` | [`NevoProps`](README.md#nevoprops)<`A`, `N`, `E`\> | `undefined` | The props holding the array `value`. |
| `itemId` | [`ItemId`](README.md#itemid)<`T`\> | `itemIdDefault` | An optional function that returns a unique identifier for a given array `item`. |

#### Returns

[`ItemCallable`](interfaces/ItemCallable.md)<`T`, `N`, `E`\>

The `item` function that returns the props for a specific item `index`.

#### Defined in

[hooks/useArray.ts:33](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useArray.ts#L33)

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

[hooks/useChange.ts:4](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useChange.ts#L4)

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

[hooks/useDebounce.ts:4](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useDebounce.ts#L4)

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

[hooks/useInput.ts:4](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useInput.ts#L4)

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

[hooks/useLog.ts:6](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useLog.ts#L6)

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ObjectProps`](README.md#objectprops)<`T`, `E`\> | The props holding the object `value`. |

#### Returns

[`PropertyCallbable`](interfaces/PropertyCallbable.md)<`T`, `N`, `E`\>

The `property` function that returns the props for a specific property `name`.

#### Defined in

[hooks/useObject.ts:19](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useObject.ts#L19)

___

### useOption

▸ **useOption**<`T`, `K`\>(`propertyName`, `props`): [`OptionPropsAdapted`](README.md#optionpropsadapted)<`T`, `K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `K` |
| `props` | [`NevoProps`](README.md#nevoprops)<`T`\> |

#### Returns

[`OptionPropsAdapted`](README.md#optionpropsadapted)<`T`, `K`\>

#### Defined in

[hooks/useOption.ts:4](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useOption.ts#L4)

___

### usePromise

▸ **usePromise**<`T`\>(`promise?`): `PromiseState`<`T`\>

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

`PromiseState`<`T`\>

A promise state object

#### Defined in

[hooks/usePromise.ts:25](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/usePromise.ts#L25)

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

[hooks/useRemove.ts:4](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useRemove.ts#L4)

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

[hooks/useResilient.ts:11](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useResilient.ts#L11)

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

[hooks/useSyncedSignal.ts:3](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useSyncedSignal.ts#L3)

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

[hooks/useSyncedState.ts:12](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useSyncedState.ts#L12)

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

[hooks/useTransform.ts:17](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useTransform.ts#L17)

___

### useValidator

▸ **useValidator**<`T`, `N`\>(`props`, `onValidate?`): `PromiseState`<`undefined` \| `string`[]\>

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

`PromiseState`<`undefined` \| `string`[]\>

#### Defined in

[hooks/useValidator.ts:6](https://github.com/nevoland/realue/blob/7809fdd/lib/hooks/useValidator.ts#L6)
