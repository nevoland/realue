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

[lib/hooks/useSyncedProps.ts:11](https://github.com/nevoland/realue/blob/61d16d842d4c11bef8dfade29a565911353a8f17/lib/hooks/useSyncedProps.ts#L11)
