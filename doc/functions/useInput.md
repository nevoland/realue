[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useInput

# Function: useInput()

> **useInput**\<`T`\>(`props`, `extractValue`): `undefined` \| (`event`) => `void`

Returns an event listener that, when triggered, extracts the value from the target element and provides it to the NEVO property `onChange(value, name)`.

## Type Parameters

• **T**

## Parameters

• **props**: `Pick`\<[`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>, `"name"` \| `"value"` \| `"onChange"`\>

Properties `name` and `onChange` according to the NEVO pattern.

• **extractValue**

Callback extracting the value from the provided target element.

## Returns

`undefined` \| (`event`) => `void`

Event listener.

## Defined in

[lib/hooks/useInput.ts:11](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useInput.ts#L11)
