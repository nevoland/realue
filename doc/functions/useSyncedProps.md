[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useSyncedProps

# Function: useSyncedProps()

> **useSyncedProps**\<`T`\>(`props`?): `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"name"` \| `"error"` \| `"value"`\> & `Required`\<`Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"onChangeError"`\>\>

Creates a local state of `value` and `error` values and syncs them with the parent `props`, if provided.
Usefull if you need to handle a local state while ensuring that new values provided from the parent component are taken into consideration, or to let the parent know about `value` and `error` changes.

## Type Parameters

• **T**

## Parameters

• **props?**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Optional properties according to the NEVO pattern.

## Returns

`Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"name"` \| `"error"` \| `"value"`\> & `Required`\<`Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"onChangeError"`\>\>

Properties according to the NEVO pattern.

## Defined in

<<<<<<< HEAD
[lib/hooks/useSyncedProps.ts:11](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/hooks/useSyncedProps.ts#L11)
=======
[lib/hooks/useSyncedProps.ts:11](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useSyncedProps.ts#L11)
>>>>>>> origin/main
