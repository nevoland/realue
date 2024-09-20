[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useMutator

# Function: useMutator()

> **useMutator**\<`T`\>(`props`): [`ValueMutatorNamed`](../type-aliases/ValueMutatorNamed.md)\<`T`\> \| `undefined`

Returns a simple mutator that takes only the new `value` as argument.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"name"` \| `"value"` \| `"onChange"`\>

Properties `name` and `onChange` according to the NEVO pattern.

## Returns

[`ValueMutatorNamed`](../type-aliases/ValueMutatorNamed.md)\<`T`\> \| `undefined`

Simple mutator that takes only the new `value` as argument.

## Defined in

[lib/hooks/useMutator.ts:10](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/hooks/useMutator.ts#L10)
