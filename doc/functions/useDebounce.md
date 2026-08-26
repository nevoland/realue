[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useDebounce

# Function: ~~useDebounce()~~

> **useDebounce**\<`T`\>(`props`, `duration`?, `options`?): `object`

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties according to the NEVO pattern.

• **duration?**: `number`

The delay duration in milliseconds.

• **options?**: `DelayOptions`

Optional configuration for the delay behavior. See [DelayOptions](../type-aliases/DelayOptions.md) for details.

## Returns

`object`

Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.

### ~~name?~~

> `optional` **name**: [`Name`](../type-aliases/Name.md)

### ~~onChange?~~

> `optional` **onChange**: [`MaybeDelayedFunction`](../type-aliases/MaybeDelayedFunction.md)\<[`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\>\>

### ~~value~~

> **value**: `T`

## Deprecated

This function was renamed to `useDelay`.

## Defined in

[lib/hooks/useDebounce.ts:6](https://github.com/nevoland/realue/blob/ae52e491a42ea548f37572294c8879745c3e1bb1/lib/hooks/useDebounce.ts#L6)
