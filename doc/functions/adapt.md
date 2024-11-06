[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / adapt

# Function: adapt()

> **adapt**\<`T`, `K`\>(`props`, `propertyName`): [`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

Adapts the provided `props` to the specified `propertyName`.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the Nevo pattern.

• **propertyName**: `K`

Name of the value property.

## Returns

[`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

## Example

```tsx
<SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
```

## Defined in

[lib/tools/adapt.ts:17](https://github.com/nevoland/realue/blob/02eadad2b1348179ffb758c002c1a34797a6b7aa/lib/tools/adapt.ts#L17)
