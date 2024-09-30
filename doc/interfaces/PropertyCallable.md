[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / PropertyCallable

# Interface: PropertyCallable()\<T\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Param

The name of the property for which to generate the props.

## Type Parameters

• **T** *extends* `object`

> **PropertyCallable**\<`K`\>(`propertyName`): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\[`K`\], [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\[`K`\], `NonNullable`\<`T`\[`K`\]\>\>\> & `object`

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Type Parameters

• **K** *extends* `string` \| `number` \| `symbol`

## Parameters

• **propertyName**: `K`

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\[`K`\], [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\[`K`\], `NonNullable`\<`T`\[`K`\]\>\>\> & `object`

## Param

The name of the property for which to generate the props.

## Defined in

[lib/types/PropertyCallable.ts:11](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/types/PropertyCallable.ts#L11)

> **PropertyCallable**(): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`, [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`, [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)\>

## Param

The name of the property for which to generate the props.

## Defined in

[lib/types/PropertyCallable.ts:14](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/types/PropertyCallable.ts#L14)
