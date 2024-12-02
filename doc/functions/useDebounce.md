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

### ~~name?~~

> `optional` **name**: `string`

The name used to identify the entity represented by the `value`.

### ~~onChange~~

> **onChange**: `undefined` \| [`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\> = `wrappedOnChange`

### ~~value~~

> **value**: `T`

## Deprecated

This function was renamed to `useDelay`.

## Defined in

[lib/hooks/useDebounce.ts:6](https://github.com/nevoland/realue/blob/bd94583533dfd64901173bd4809940f1a6c957d9/lib/hooks/useDebounce.ts#L6)
