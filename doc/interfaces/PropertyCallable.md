[realue](../README.md) / PropertyCallable

# Interface: PropertyCallable\<T, N\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |

## Callable

### PropertyCallable

▸ **PropertyCallable**\<`K`\>(`propertyName`): [`NevoProps`](../README.md#nevoprops)\<`T`[`K`], `string`, [`ErrorReport`](../README.md#errorreport)\<`T`[`K`], `NonNullable`\<`T`[`K`]\>\>\> & \{ `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `K` |

#### Returns

[`NevoProps`](../README.md#nevoprops)\<`T`[`K`], `string`, [`ErrorReport`](../README.md#errorreport)\<`T`[`K`], `NonNullable`\<`T`[`K`]\>\>\> & \{ `key`: `string`  }

#### Defined in

[lib/types/PropertyCallable.ts:12](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/PropertyCallable.ts#L12)

### PropertyCallable

▸ **PropertyCallable**(): [`NevoProps`](../README.md#nevoprops)\<`T`, `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Returns

[`NevoProps`](../README.md#nevoprops)\<`T`, `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Defined in

[lib/types/PropertyCallable.ts:15](https://github.com/nevoland/realue/blob/d9b96c1/lib/types/PropertyCallable.ts#L15)
