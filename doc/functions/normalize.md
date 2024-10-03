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

[lib/tools/normalize.ts:17](https://github.com/nevoland/realue/blob/1fa38fef80c9df28c076a8a44728e2fb20f56b0b/lib/tools/normalize.ts#L17)
