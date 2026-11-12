[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useDelay

# Function: useDelay()

> **useDelay**\<`T`\>(`props`, `duration`?, `options`?): `object`

Delays calls of the value mutator `onChange` while immediately updating the local `value`.
If `duration` is `undefined`, returns the provided `props` untouched.

The returned `onChange` also exposes the `cancel()` and `flush()` methods and the `pending` and `result` properties of the underlying delayed function. Pending calls are cancelled when the `duration` or the provided `onChange` change, or when the element unmounts.

If `onChange` changes while a delayed call is pending, the pending call will be canceled to avoid calling the outdated `onChange`. Therefore, it is important to ensure that the `onChange` function is stable (e.g., by using `useCallback`) when using this hook to prevent unintended cancellations.

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

Properties according to the NEVO pattern, with `onChange` being a delayed value mutator.

### name?

> `optional` **name**: [`Name`](../type-aliases/Name.md)

### onChange?

> `optional` **onChange**: [`MaybeDelayedFunction`](../type-aliases/MaybeDelayedFunction.md)\<[`ValueMutator`](../type-aliases/ValueMutator.md)\<`T`\>\>

### value

> **value**: `T`

## Defined in

[lib/hooks/useDelay.ts:22](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useDelay.ts#L22)
