[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / changeError

# Function: changeError()

## changeError(error, itemName, itemError)

> **changeError**\<`T`\>(`error`, `itemName`, `itemError`): [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\> \| `undefined`

Returns a new error report out of the provided `error` report of an object or an array, where the error report of the child with the specified `itemName` is set to `itemError`.
If `itemName` is the empty string `""`, sets the error that pertains to the entire value.

The resulting error report is normalized: if only a global error remains, it is returned as a list of strings, and if it is empty, `undefined` is returned.

Does not mutate the provided `error` report.

### Type Parameters

• **T** *extends* `undefined` \| readonly `any`[]

### Parameters

• **error**: `undefined` \| [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\>

The error report of an object or an array.

• **itemName**: `number` \| `""`

The property name or item index of the child, or `""` for the entire value.

• **itemError**: `undefined` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`NonNullable`\<`T`\>\[`number`\]\>

The error report to set for the child, or `undefined` to remove it.

### Returns

[`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\> \| `undefined`

The updated error report, or `undefined` if there are no errors left.

### Example

```ts
changeError({ name: ["Missing name."] }, "level", ["Must be positive."]);
// { name: ["Missing name."], level: ["Must be positive."] }
changeError({ name: ["Missing name."] }, "name", undefined);
// undefined
changeError(["Invalid value."], "name", ["Missing name."]);
// { "": ["Invalid value."], name: ["Missing name."] }
```

### Defined in

[lib/tools/changeError.ts:34](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/changeError.ts#L34)

## changeError(error, itemName, itemError)

> **changeError**\<`T`\>(`error`, `itemName`, `itemError`): [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\> \| `undefined`

### Type Parameters

• **T** *extends* `undefined` \| `object`

### Parameters

• **error**: `undefined` \| [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\>

• **itemName**: `""` \| keyof `NonNullable`\<`T`\>

• **itemError**: `undefined` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`NonNullable`\<`T`\>\[keyof `NonNullable`\<`T`\>\]\>

### Returns

[`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\> \| `undefined`

### Defined in

[lib/tools/changeError.ts:39](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/changeError.ts#L39)
