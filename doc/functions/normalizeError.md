[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / normalizeError

# Function: normalizeError()

> **normalizeError**\<`T`\>(`error`): `undefined` \| [`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> & `null` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> & `object`

Normalizes the provided `error` report:
  - If it only contains a global error at the empty string key `""`, returns that list of strings instead.
  - If it is empty (an empty list or an empty object), returns `undefined`.
  - Otherwise, returns it as is.

## Type Parameters

• **T**

## Parameters

• **error**: `undefined` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\>

The error report to normalize.

## Returns

`undefined` \| [`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> & `null` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\> & `object`

The normalized error report, or `undefined` if it contains no errors.

## Example

```ts
normalizeError({ "": ["Invalid value."] }); // ["Invalid value."]
normalizeError({}); // undefined
normalizeError([]); // undefined
```

## Defined in

[lib/tools/normalizeError.ts:20](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/normalizeError.ts#L20)
