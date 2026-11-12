[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / normalize

# Function: normalize()

> **normalize**\<`T`, `K`\>(`props`, `propertyName`): [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Normalizes the provided `props` adapted to the provided `propertyName` back into props according to the NEVO pattern.
The `${propertyName}Name`, `${propertyName}Error`, `${propertyName}`, `onChange${Capitalize<propertyName>}`, and `onChange${Capitalize<propertyName>}Error` props are respectively renamed to `name`, `error`, `value`, `onChange`, and `onChangeError`.

This is the inverse of `adapt`.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: [`NevoPropsAdapted`](../type-aliases/NevoPropsAdapted.md)\<`T`, `K`\>

Properties adapted to the `propertyName`.

• **propertyName**: `K`

Name of the value property.

## Returns

[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

## Example

```tsx
<SomeComponent {...normalize(props, "option")} />
```

## Defined in

[lib/tools/normalize.ts:20](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/normalize.ts#L20)
