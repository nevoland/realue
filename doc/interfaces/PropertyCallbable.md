[realue](../README.md) / PropertyCallbable

# Interface: PropertyCallbable<T, N, E\>

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

[types.ts:65](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L65)

### PropertyCallbable

▸ **PropertyCallbable**(): [`NevoProps`](../README.md#nevoprops)<`T`, `N`, `E`[``""``]\>

#### Returns

[`NevoProps`](../README.md#nevoprops)<`T`, `N`, `E`[``""``]\>

#### Defined in

[types.ts:72](https://github.com/davidbonnet/realue/blob/5e081c3/lib/types.ts#L72)
