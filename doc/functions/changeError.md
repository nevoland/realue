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

[lib/tools/changeError.ts:12](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/tools/changeError.ts#L12)

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

[lib/tools/changeError.ts:20](https://github.com/nevoland/realue/blob/90be82ca388547f529d338e720e90d4eeb8b3263/lib/tools/changeError.ts#L20)
