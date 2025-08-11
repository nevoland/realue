[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useAbortController

# Function: useAbortController()

> **useAbortController**(): () => `AbortController`

Returns a function that creates an `AbortController` and aborts the previous one (if any).
The last created `AbortController` is aborted when the component unmounts.

## Returns

`Function`

Callback that returns a new `AbortController`.

### Returns

`AbortController`

## Defined in

[lib/hooks/useAbortController.ts:14](https://github.com/nevoland/realue/blob/131459fc0cd410aac7d8aca18b8f481f26a49eb4/lib/hooks/useAbortController.ts#L14)
