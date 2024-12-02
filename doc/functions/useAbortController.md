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

[lib/hooks/useAbortController.ts:14](https://github.com/nevoland/realue/blob/bd94583533dfd64901173bd4809940f1a6c957d9/lib/hooks/useAbortController.ts#L14)
