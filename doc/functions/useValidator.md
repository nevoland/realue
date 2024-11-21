[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useValidator

# Function: useValidator()

## useValidator(props, onValidate)

> **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate`?): [`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

Validates the provided `value` property using the `onValidate` asynchronous callback function.
This function returns a promise state object that tracks the status of the validation process.

The `onValidate` callback function is expected to return a value or a promise that resolves with one of the following:
  - An error value indicating that validation has failed.
  - `undefined` if the validation succeeds without errors.

### Type Parameters

• **T**

• **N** *extends* `string`

• **E** *extends* [`ErrorReportValue`](../type-aliases/ErrorReportValue.md)

### Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`, `E`\>

Properties according to the NEVO pattern.

• **onValidate?**: [`ValueValidator`](../type-aliases/ValueValidator.md)\<`T`, `E`\>

Synchronous or asynchronous value validator.

### Returns

[`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

The promise state object.

### Defined in

[lib/hooks/useValidator.ts:28](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useValidator.ts#L28)

## useValidator(props, onValidate)

> **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate`?): [`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

### Type Parameters

• **T** *extends* `object`

• **N** *extends* `string`

• **E** *extends* [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`T`\>

### Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`, `E`\>

• **onValidate?**: [`ValueValidator`](../type-aliases/ValueValidator.md)\<`T`, `E`\>

### Returns

[`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

### Defined in

[lib/hooks/useValidator.ts:32](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useValidator.ts#L32)

## useValidator(props, onValidate)

> **useValidator**\<`T`, `N`, `E`\>(`props`, `onValidate`?): [`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

### Type Parameters

• **T** *extends* `unknown`[]

• **N** *extends* `string`

• **E** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`T`\>

### Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`T`, `E`\>

• **onValidate?**: [`ValueValidator`](../type-aliases/ValueValidator.md)\<`T`, `E`\>

### Returns

[`PromiseState`](../type-aliases/PromiseState.md)\<`E` \| `undefined`\>

### Defined in

[lib/hooks/useValidator.ts:40](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useValidator.ts#L40)
