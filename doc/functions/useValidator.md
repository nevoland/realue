[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useValidator

# Function: useValidator()

> **useValidator**\<`T`\>(`props`, `onValidate`?): [`PromiseState`](../type-aliases/PromiseState.md)\<[`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> \| `undefined`\>

Validates the provided `value` property using the `onValidate` asynchronous callback function, and reports the resulting error through `onChangeError(error, name)` if it differs from the current `error`.
This function returns a promise state object that tracks the status of the validation process.

The `onValidate(value, name, error)` callback function is called every time the `value`, `name`, `onValidate`, or `onChangeError` change. It is expected to return a value or a promise that resolves with one of the following:
  - An error value indicating that validation has failed.
  - `undefined` if the validation succeeds without errors.

No validation occurs if `onValidate` or `onChangeError` is not set.

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

[lib/hooks/useValidator.ts:27](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useValidator.ts#L27)
