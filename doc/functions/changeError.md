[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / changeError

# Function: changeError()

## changeError(error, itemName, itemError)

> **changeError**\<`T`\>(`error`, `itemName`, `itemError`): [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\> \| `undefined`

### Type Parameters

• **T** *extends* `undefined` \| readonly `any`[]

### Parameters

• **error**: `undefined` \| [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\>

• **itemName**: `number` \| `""`

• **itemError**: `undefined` \| [`ErrorReport`](../type-aliases/ErrorReport.md)\<`NonNullable`\<`T`\>\[`number`\]\>

### Returns

[`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\> \| `undefined`

### Defined in

[lib/tools/changeError.ts:11](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/tools/changeError.ts#L11)

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

[lib/tools/changeError.ts:16](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/tools/changeError.ts#L16)
