# -realue

## Table of contents

### Modules

- [&lt;internal\&gt;](../wiki/%3Cinternal%3E)

### Hook Functions

- [useObject](../wiki/Exports#useobject)

### Other Functions

- [isEmpty](../wiki/Exports#isempty)
- [logProps](../wiki/Exports#logprops)
- [omitKey](../wiki/Exports#omitkey)
- [sleep](../wiki/Exports#sleep)
- [timeout](../wiki/Exports#timeout)
- [undefinedIfEmpty](../wiki/Exports#undefinedifempty)
- [useArray](../wiki/Exports#usearray)
- [useDebounce](../wiki/Exports#usedebounce)
- [usePromise](../wiki/Exports#usepromise)
- [useRemove](../wiki/Exports#useremove)
- [useSynchedState](../wiki/Exports#usesynchedstate)
- [useValidator](../wiki/Exports#usevalidator)

## Hook Functions

### useObject

▸ **useObject**<`T`, `E`\>(`options`): [`PropertyCallbable`](../wiki/%3Cinternal%3E.PropertyCallbable)<`T`, `E`\>

Takes an object and returns a function that generates the required props for handling an object property value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `E` | extends [`ErrorReportObject`](../wiki/%3Cinternal%3E#errorreportobject)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ObjectProps`](../wiki/%3Cinternal%3E#objectprops)<`T`, `E`\> |

#### Returns

[`PropertyCallbable`](../wiki/%3Cinternal%3E.PropertyCallbable)<`T`, `E`\>

#### Defined in

[lib/hooks/useObject.ts:52](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useObject.ts#L52)

___

## Other Functions

### isEmpty

▸ **isEmpty**<`T`\>(`value?`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` = {} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

#### Returns

`boolean`

#### Defined in

[lib/tools/isEmpty.ts:1](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/isEmpty.ts#L1)

___

### logProps

▸ **logProps**(`title`, `props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `title` | `string` |
| `props` | [`Props`](../wiki/%3Cinternal%3E#props) |

#### Returns

`void`

#### Defined in

[lib/tools/logProps.ts:5](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/logProps.ts#L5)

___

### omitKey

▸ **omitKey**<`T`, `K`\>(`value`, `key`): `undefined` \| [`Omit`](../wiki/%3Cinternal%3E#omit)<`T`, `K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `undefined` \| `T` |
| `key` | `K` |

#### Returns

`undefined` \| [`Omit`](../wiki/%3Cinternal%3E#omit)<`T`, `K`\>

#### Defined in

[lib/tools/omitKey.ts:1](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/omitKey.ts#L1)

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

[lib/tools/sleep.ts:4](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/sleep.ts#L4)

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

[lib/tools/timeout.ts:3](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/timeout.ts#L3)

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

[lib/tools/undefinedIfEmpty.ts:3](https://github.com/davidbonnet/realue/blob/084ba0c/lib/tools/undefinedIfEmpty.ts#L3)

___

### useArray

▸ **useArray**<`T`, `E`\>(`«destructured»`, `itemKey?`): [`ItemCallbable`](../wiki/%3Cinternal%3E.ItemCallbable)<`T`, `E`\>

Takes an array and returns a function that generates the required props for handling an array item value.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends [`ErrorReportArray`](../wiki/%3Cinternal%3E#errorreportarray)<`T`[]\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `«destructured»` | [`NevoProps`](../wiki/%3Cinternal%3E#nevoprops)<(`undefined` \| `T`)[], `E`\> | `undefined` |
| `itemKey` | (`index`: `number`, `item`: `undefined` \| `T`) => `string` | `itemKeyDefault` |

#### Returns

[`ItemCallbable`](../wiki/%3Cinternal%3E.ItemCallbable)<`T`, `E`\>

#### Defined in

[lib/hooks/useArray.ts:34](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useArray.ts#L34)

___

### useDebounce

▸ **useDebounce**<`T`\>(`props`, `delay?`): { `error?`: [`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\> ; `name`: `string` ; `onChange`: `undefined` \| [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`\> = wrappedOnChange; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<[`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\>, `string`\> ; `value`: `undefined` \| `T`  } \| { `error?`: [`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\> ; `name`: `string` ; `onChange`: `undefined` \| [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`\> = wrappedOnChange; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<[`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\>, `string`\> ; `value`: `undefined` \| `T`  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`NevoProps`](../wiki/%3Cinternal%3E#nevoprops)<`T`\> |
| `delay?` | `number` |

#### Returns

{ `error?`: [`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\> ; `name`: `string` ; `onChange`: `undefined` \| [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`\> = wrappedOnChange; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<[`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\>, `string`\> ; `value`: `undefined` \| `T`  } \| { `error?`: [`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\> ; `name`: `string` ; `onChange`: `undefined` \| [`ValueMutator`](../wiki/%3Cinternal%3E#valuemutator)<`T`\> = wrappedOnChange; `onChangeError?`: [`ErrorMutator`](../wiki/%3Cinternal%3E#errormutator)<[`ErrorReport`](../wiki/%3Cinternal%3E#errorreport)<`T`, [`NonNullable`](../wiki/%3Cinternal%3E#nonnullable)<`T`\>\>, `string`\> ; `value`: `undefined` \| `T`  }

#### Defined in

[lib/hooks/useDebounce.ts:5](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useDebounce.ts#L5)

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
| `reason?` | [`Error`](../wiki/%3Cinternal%3E#error) |
| `status` | ``"idle"`` \| ``"pending"`` \| ``"fulfilled"`` \| ``"rejected"`` |
| `value?` | `T` |

#### Defined in

[lib/hooks/usePromise.ts:17](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/usePromise.ts#L17)

___

### useRemove

▸ **useRemove**(`«destructured»`): `undefined` \| () => `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `name` | `string` |
| › `onRemove?` | [`ValueRemover`](../wiki/%3Cinternal%3E#valueremover) |

#### Returns

`undefined` \| () => `void`

#### Defined in

[lib/hooks/useRemove.ts:4](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useRemove.ts#L4)

___

### useSynchedState

▸ **useSynchedState**<`T`\>(`value`): [`T`, (`value`: `T`) => `void`]

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

[lib/hooks/useSynchedState.ts:3](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useSynchedState.ts#L3)

___

### useValidator

▸ **useValidator**<`T`\>(`«destructured»`, `onValidate?`): `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`Pick`](../wiki/%3Cinternal%3E#pick)<[`NevoProps`](../wiki/%3Cinternal%3E#nevoprops)<`T`, `string`[]\>, ``"name"`` \| ``"value"`` \| ``"error"`` \| ``"onChangeError"``\> |
| `onValidate?` | [`ValueValidator`](../wiki/%3Cinternal%3E#valuevalidator)<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `onChange` | (`promise?`: `string`[] \| `Promise`<`undefined` \| `string`[]\>) => `void` |
| `promise?` | `string`[] \| `Promise`<`undefined` \| `string`[]\> |
| `reason?` | [`Error`](../wiki/%3Cinternal%3E#error) |
| `status` | ``"idle"`` \| ``"pending"`` \| ``"fulfilled"`` \| ``"rejected"`` |
| `value?` | `string`[] |

#### Defined in

[lib/hooks/useValidator.ts:5](https://github.com/davidbonnet/realue/blob/084ba0c/lib/hooks/useValidator.ts#L5)
