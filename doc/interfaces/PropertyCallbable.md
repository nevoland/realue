[realue](../README.md) / PropertyCallbable

# Interface: PropertyCallbable<T, N, E\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

**`Param`**

The name of the property for which to generate the props.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |
| `N` | extends `string` |
| `E` | extends [`ErrorReportObject`](../README.md#errorreportobject)<`T`\> |

## Callable

### PropertyCallbable

▸ **PropertyCallbable**<`K`\>(`propertyName`): [`NevoProps`](../README.md#nevoprops)<`T`[`K`], `N`, `Partial`<{ [K in string \| number \| symbol]: ErrorReport<T[K], NonNullable<T[K]\>\> }\>[`K`]\> & { `key`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyName` | `K` |

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`[`K`], `N`, `Partial`<{ [K in string \| number \| symbol]: ErrorReport<T[K], NonNullable<T[K]\>\> }\>[`K`]\> & { `key`: `string`  }

#### Defined in

[types.ts:129](https://github.com/davidbonnet/realue/blob/36e30da/lib/types.ts#L129)

### PropertyCallbable

▸ **PropertyCallbable**(): [`NevoProps`](../README.md#nevoprops)<`T`, `N`, `E`[``""``]\>

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`, `N`, `E`[``""``]\>

#### Defined in

[types.ts:136](https://github.com/davidbonnet/realue/blob/36e30da/lib/types.ts#L136)
