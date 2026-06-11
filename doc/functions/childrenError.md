[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / childrenError

# Function: childrenError()

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

### Type Parameters

• **T** *extends* `unknown`[]

### Parameters

• **error?**: [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`T`\>

### Returns

`Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

### Defined in

[lib/tools/childrenError.ts:10](https://github.com/nevoland/realue/blob/52b891d9400f41f667766205b82049d537ca8c59/lib/tools/childrenError.ts#L10)

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Type Parameters

• **T** *extends* `object`

### Parameters

• **error?**: [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`T`\>

### Returns

`Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Defined in

[lib/tools/childrenError.ts:17](https://github.com/nevoland/realue/blob/52b891d9400f41f667766205b82049d537ca8c59/lib/tools/childrenError.ts#L17)
