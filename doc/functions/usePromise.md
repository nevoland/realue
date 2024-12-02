[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / usePromise

# Function: usePromise()

> **usePromise**\<`T`\>(`promise`?): [`PromiseState`](../type-aliases/PromiseState.md)\<`T`\>

Returns a promise state object to track the provided `promise`.
Ignores outdated promises or ones that resolve when the component got unmounted.
Non-promise values are immediately resolved, avoiding a second render.

## Type Parameters

• **T**

## Parameters

• **promise?**: `T` \| `Promise`\<`T`\>

The promise to track.

## Returns

[`PromiseState`](../type-aliases/PromiseState.md)\<`T`\>

A promise state object.

## Defined in

[lib/hooks/usePromise.ts:19](https://github.com/nevoland/realue/blob/bd94583533dfd64901173bd4809940f1a6c957d9/lib/hooks/usePromise.ts#L19)
