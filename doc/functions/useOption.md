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

[lib/hooks/useOption.ts:11](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/hooks/useOption.ts#L11)
