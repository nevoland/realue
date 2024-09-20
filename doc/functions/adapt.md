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

[lib/tools/adapt.ts:17](https://github.com/nevoland/realue/blob/3b94de974007eb3f6e3fed9f3fba05ea8113f723/lib/tools/adapt.ts#L17)
