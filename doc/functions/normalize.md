[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / normalize

# Function: normalize()

> **normalize**\<`T`, `K`\>(`props`, `propertyName`): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Normalizes the provided `props` from the provided `propertyName`.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: [`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

Propertyes according to the Nevo pattern.

• **propertyName**: `K`

Name of the value property.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

## Example

```tsx
<SomeComponent {...normalize("option", props)} />
```

## Defined in

[lib/tools/normalize.ts:17](https://github.com/nevoland/realue/blob/61d16d842d4c11bef8dfade29a565911353a8f17/lib/tools/normalize.ts#L17)
