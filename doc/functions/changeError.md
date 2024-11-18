[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / changeError

# Function: changeError()

## changeError(error, itemName, itemError)

> **changeError**\<`T`, `E`\>(`error`, `itemName`, `itemError`): `E` \| `undefined`

### Type Parameters

• **T** *extends* `undefined` \| `object`

• **E** *extends* [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`NonNullable`\<`T`\>\>

### Parameters

• **error**: `undefined` \| `E`

• **itemName**: `""` \| keyof `E`

• **itemError**: `undefined` \| [`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| `E`\[keyof `E`\]

### Returns

`E` \| `undefined`

### Defined in

[lib/tools/changeError.ts:12](https://github.com/nevoland/realue/blob/3f70cb4d9fb06b3cde8060aa67f306f2aaa9dc1d/lib/tools/changeError.ts#L12)

## changeError(error, itemName, itemError)

> **changeError**\<`T`, `E`\>(`error`, `itemName`, `itemError`): `E` \| `undefined`

### Type Parameters

• **T** *extends* `undefined` \| readonly `any`[]

• **E** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`T`\>\>

### Parameters

• **error**: `undefined` \| `E`

• **itemName**: `number` \| `""`

• **itemError**: `undefined` \| [`ErrorReportValue`](../type-aliases/ErrorReportValue.md) \| `E`\[`number`\]

### Returns

`E` \| `undefined`

### Defined in

[lib/tools/changeError.ts:20](https://github.com/nevoland/realue/blob/3f70cb4d9fb06b3cde8060aa67f306f2aaa9dc1d/lib/tools/changeError.ts#L20)
