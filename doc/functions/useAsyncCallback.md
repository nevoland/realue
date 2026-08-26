[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useAsyncCallback

# Function: useAsyncCallback()

> **useAsyncCallback**\<`C`\>(`callback`, `dependencies`): [`C`, [`PromiseState`](../type-aliases/PromiseState.md)\<`ReturnType`\<`C`\>\>]

A hook that returns a callback function that will execute the given async function and return its result, and the state of the promise returned by the async function.

## Type Parameters

• **C** *extends* (...`args`) => `Promise`\<`any`\>

## Parameters

• **callback**: `C`

The async function to be executed.

• **dependencies**: `Inputs`

The dependencies array for the useCallback hook.

## Returns

[`C`, [`PromiseState`](../type-aliases/PromiseState.md)\<`ReturnType`\<`C`\>\>]

A tuple containing the async callback function and the promise state.

## Defined in

[lib/hooks/useAsyncCallback.ts:14](https://github.com/nevoland/realue/blob/ae52e491a42ea548f37572294c8879745c3e1bb1/lib/hooks/useAsyncCallback.ts#L14)
