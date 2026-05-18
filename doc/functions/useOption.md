[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useOption

# Function: useOption()

> **useOption**\<`T`, `K`\>(`props`, `optionName`): [`OptionProps`](../type-aliases/OptionProps.md)\<`T`, `K`\>

Renames the `value` prop to `${optionName}`, and renames the `onChange` prop to `onChange${capitalized(optionName)}` while transforming it into a simple mutator that takes only the new `value` as argument.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties according to the NEVO pattern.

• **optionName**: `K`

The name to use for the option.

## Returns

[`OptionProps`](../type-aliases/OptionProps.md)\<`T`, `K`\>

Properties `${optionName}` and `onChange${capitalized(optionName)}`.

## Defined in

[lib/hooks/useOption.ts:11](https://github.com/nevoland/realue/blob/009c0e8af9c57144ac590f9427129c44b47b92fb/lib/hooks/useOption.ts#L11)
