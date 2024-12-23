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

## Returns

`object`

Properties according to the NEVO pattern, with `onChange` being a debounced value mutator.

### ~~name~~

> **name**: `string`

The name used to identify the entity represented by the `value`.

### ~~onChange~~

> **onChange**: `undefined` \| [`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\> = `wrappedOnChange`

### ~~value~~

> **value**: `T`

## Deprecated

This function was renamed to `useDelay`.

## Defined in

[lib/hooks/useDebounce.ts:6](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useDebounce.ts#L6)
