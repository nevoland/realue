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

### name

> **name**: `string`

The name used to identify the entity represented by the `value`.

### onChange

> **onChange**: `undefined` \| [`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\> = `wrappedOnChange`

### value

> **value**: `undefined` *extends* `T` ? `Readonly`\<`T`\> \| `T` & `undefined` : `Readonly`\<`T`\>

## Defined in

[lib/hooks/useDelay.ts:18](https://github.com/nevoland/realue/blob/bda2c81a122722d2211255b398b35c625b1e6a1c/lib/hooks/useDelay.ts#L18)
