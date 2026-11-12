[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / adapt

# Function: adapt()

> **adapt**\<`T`, `K`\>(`props`, `propertyName`): [`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

Adapts the provided `props` to the specified `propertyName`, so that they can be spread alongside other NEVO props.
The `name`, `error`, `value`, `onChange`, and `onChangeError` props are respectively renamed to `${propertyName}Name`, `${propertyName}Error`, `${propertyName}`, `onChange${Capitalize<propertyName>}`, and `onChangeError${Capitalize<propertyName>}`.

This is the inverse of `normalize`.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

• **propertyName**: `K`

Name of the value property.

## Returns

[`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

The adapted properties.

## Example

```tsx
<SomeComponent {...property("value")} {...adapt(property("option"), "option")} />
```

## Defined in

[lib/tools/adapt.ts:20](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/adapt.ts#L20)
