[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useDelay

# Function: useDelay()

> **useDelay**\<`T`\>(`props`, `duration`?, `options`?): `object`

Delays calls of the value mutator `onChange` while immediately updating the local `value`.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties according to the NEVO pattern.

• **duration?**: `number`

The delay duration in milliseconds.

• **options?**: `DelayOptions`

## Returns

`object`

Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.

### name?

> `optional` **name**: [`Name`](../type-aliases/Name.md)

### onChange?

> `optional` **onChange**: [`MaybeDelayedFunction`](../type-aliases/MaybeDelayedFunction.md)\<[`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\>\>

### value

> **value**: `T`

## Defined in

[lib/hooks/useDelay.ts:16](https://github.com/nevoland/realue/blob/131459fc0cd410aac7d8aca18b8f481f26a49eb4/lib/hooks/useDelay.ts#L16)
