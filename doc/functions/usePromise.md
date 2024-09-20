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

[lib/hooks/usePromise.ts:20](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/hooks/usePromise.ts#L20)
