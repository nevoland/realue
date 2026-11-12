[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / globalError

# Function: globalError()

> **globalError**\<`T`\>(`error`?): [`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| `undefined`

Returns the error messages that pertain to the entire value of the provided `error` report.
If `error` is a list of strings, returns it as is. Otherwise, returns the list of strings found at the empty string key `""`, if any.

## Type Parameters

• **T**

## Parameters

• **error?**: [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\>

The error report.

## Returns

[`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| `undefined`

The list of error messages for the entire value, or `undefined` if there are none.

## Example

```ts
globalError(["Invalid value."]); // ["Invalid value."]
globalError({ "": ["Invalid value."], name: ["Missing name."] }); // ["Invalid value."]
globalError({ name: ["Missing name."] }); // undefined
```

## Defined in

[lib/tools/globalError.ts:19](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/globalError.ts#L19)
