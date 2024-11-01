[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useMutator

# Function: useMutator()

> **useMutator**\<`T`\>(`props`): [`ValueMutatorNamed`](../type-aliases/ValueMutatorNamed.md)\<`T`\> \| `undefined`

Returns a simple mutator that takes only the new `value` as argument.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties `name` and `onChange` according to the NEVO pattern.

## Returns

[`ValueMutatorNamed`](../type-aliases/ValueMutatorNamed.md)\<`T`\> \| `undefined`

Simple mutator that takes only the new `value` as argument.

## Defined in

[lib/hooks/useMutator.ts:10](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useMutator.ts#L10)
