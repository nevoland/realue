[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / PropertyCallable

# Interface: PropertyCallable()\<T\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Param

The name of the property for which to generate the props.

## Type Parameters

• **T** *extends* `object`

> **PropertyCallable**\<`K`\>(`propertyName`): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\[`K`\]\> & `object`

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Type Parameters

• **K** *extends* `string` \| `number` \| `symbol`

## Parameters

• **propertyName**: `K`

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\[`K`\]\> & `object`

## Param

The name of the property for which to generate the props.

## Defined in

[lib/types/PropertyCallable.ts:9](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/PropertyCallable.ts#L9)

> **PropertyCallable**(): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Returns the NEVO props for the property with the specified `propertyName`. If `propertyName` is not provided, returns the NEVO props for the entire object.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

## Param

The name of the property for which to generate the props.

## Defined in

[lib/types/PropertyCallable.ts:12](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/PropertyCallable.ts#L12)

## Properties

### value

> `readonly` **value**: `T`

#### Defined in

[lib/types/PropertyCallable.ts:13](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/PropertyCallable.ts#L13)
