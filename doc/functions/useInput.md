[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useInput

# Function: useInput()

> **useInput**\<`T`\>(`props`, `extractValue`): `undefined` \| (`event`) => `void`

Returns an event listener that, when triggered, extracts the value from the target element and provides it to the NEVO property `onChange(value, name)`.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"onChange"` \| `"name"` \| `"value"`\>

Properties `name` and `onChange` according to the NEVO pattern.

• **extractValue**

Callback extracting the value from the provided target element.

## Returns

`undefined` \| (`event`) => `void`

Event listener.

## Defined in

<<<<<<< HEAD
[lib/hooks/useInput.ts:11](https://github.com/nevoland/realue/blob/cbce77129663d64110c6eeb5270a3b7841e0b453/lib/hooks/useInput.ts#L11)
=======
[lib/hooks/useInput.ts:12](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/hooks/useInput.ts#L12)
>>>>>>> origin/main
