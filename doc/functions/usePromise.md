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

[lib/hooks/usePromise.ts:19](https://github.com/nevoland/realue/blob/3f70cb4d9fb06b3cde8060aa67f306f2aaa9dc1d/lib/hooks/usePromise.ts#L19)
