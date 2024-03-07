[realue](../README.md) / PropertyCallable

# Interface: PropertyCallable<T, N\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

**`Param`**

The name of the property for which to generate the props.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |

## Callable

### PropertyCallable

▸ **PropertyCallable**<`K`\>(`propertyName`): [`NevoProps`](../README.md#nevoprops)<`T`[`K`], `N`, [`ErrorReport`](../README.md#errorreport)<`T`[`K`], `NonNullable`<`T`[`K`]\>\>\> & { `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `K` |

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`[`K`], `N`, [`ErrorReport`](../README.md#errorreport)<`T`[`K`], `NonNullable`<`T`[`K`]\>\>\> & { `key`: `string`  }

#### Defined in

[lib/types/PropertyCallable.ts:11](https://github.com/nevoland/realue/blob/f773d23/lib/types/PropertyCallable.ts#L11)

### PropertyCallable

▸ **PropertyCallable**(): [`NevoProps`](../README.md#nevoprops)<`T`, `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`, `N`, [`ErrorReportValue`](../README.md#errorreportvalue)\>

#### Defined in

[lib/types/PropertyCallable.ts:14](https://github.com/nevoland/realue/blob/f773d23/lib/types/PropertyCallable.ts#L14)
