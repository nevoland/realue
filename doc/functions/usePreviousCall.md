[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / usePreviousCall

# Function: usePreviousCall()

> **usePreviousCall**\<`C`\>(`callback`): `C`

Calls a callback factory with the previous invocation's parameters and result, then invokes the returned callback with the current parameters.

This allows for computations that require working with the previous parameters and result.

## Type Parameters

• **C** *extends* (...`parameters`) => `any`

## Parameters

• **callback**

The callback that receives the previous parameters and result of and returns a callback for which the previous parameters and result are provided.

## Returns

`C`

A callback that receives the previous parameters and result, and returns a callback for which the previous parameters and result are provided.

## Defined in

[lib/hooks/usePreviousCall.ts:11](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/hooks/usePreviousCall.ts#L11)
