[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useFetch

# Function: ~~useFetch()~~

> **useFetch**\<`T`, `Q`\>(`fetch`, `props`?): [[`PromiseState`](../type-aliases/PromiseState.md)\<`T`\>, (`request`?) => `void`]

Handles a single concurrent request and updates the `value` or `error` through the provided `onChange` and `onChangeError` callbacks. The callback in the returned tuple enables issuing a new request. If the callback is called with no arguments, it resets the request back to the `idle` state, aborting the prior request if it was not fulfilled.

## Type Parameters

• **T**

• **Q** *extends* `unknown`

## Parameters

• **fetch**: [`Fetch`](../type-aliases/Fetch.md)\<`T`, `Q`\> = `...`

An optional request fetcher that defaults to using the standard `fetch` method.

• **props?**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

The optional `onChange` and `onChangeError` callbacks to notify about the resulting `value` or `error`, and the `name`.

## Returns

[[`PromiseState`](../type-aliases/PromiseState.md)\<`T`\>, (`request`?) => `void`]

A tuple consisting of the current request state and a callback to issue a new request.

## Deprecated

Use `useAsyncProps` instead.

## Defined in

[lib/hooks/useFetch.ts:21](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useFetch.ts#L21)
