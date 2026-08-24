[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useValidator

# Function: useValidator()

> **useValidator**\<`T`\>(`props`, `onValidate`?): [`PromiseState`](../type-aliases/PromiseState.md)\<[`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> \| `undefined`\>

Validates the provided `value` property using the `onValidate` asynchronous callback function.
This function returns a promise state object that tracks the status of the validation process.

The `onValidate` callback function is expected to return a value or a promise that resolves with one of the following:
  - An error value indicating that validation has failed.
  - `undefined` if the validation succeeds without errors.

## Type Parameters

• **T**

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`\>

Properties according to the NEVO pattern.

• **onValidate?**: [`ValueValidator`](../type-aliases/ValueValidator.md)\<`T`\>

Synchronous or asynchronous value validator.

## Returns

[`PromiseState`](../type-aliases/PromiseState.md)\<[`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> \| `undefined`\>

The promise state object.

## Defined in

[lib/hooks/useValidator.ts:25](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/hooks/useValidator.ts#L25)
