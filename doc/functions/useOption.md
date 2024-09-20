[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useOption

# Function: useOption()

> **useOption**\<`T`, `K`\>(`props`, `optionName`): [`OptionPropsAdapted`](../type-aliases/OptionPropsAdapted.md)\<`T`, `K`\>

Renames the `value` prop to `${optionName}`, and renames the `onChange` prop to `onChange${capitalized(optionName)}` while transforming it into a simple mutator that takes only the new `value` as argument.

## Type Parameters

• **T**

• **K** *extends* `string`

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"name"` \| `"value"` \| `"onChange"`\>

Properties according to the NEVO pattern.

• **optionName**: `K`

The name to use for the option.

## Returns

[`OptionPropsAdapted`](../type-aliases/OptionPropsAdapted.md)\<`T`, `K`\>

Properties `${optionName}` and `onChange${capitalized(optionName)}`.

## Defined in

[lib/hooks/useOption.ts:11](https://github.com/nevoland/realue/blob/23357baeee67e2e83a0bceccc257348ca52e5775/lib/hooks/useOption.ts#L11)