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

[lib/hooks/useMutator.ts:10](https://github.com/nevoland/realue/blob/1fa38fef80c9df28c076a8a44728e2fb20f56b0b/lib/hooks/useMutator.ts#L10)
