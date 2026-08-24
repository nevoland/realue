[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / childrenError

# Function: childrenError()

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

### Type Parameters

• **T** *extends* readonly `any`[]

### Parameters

• **error?**: [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`T`\>

### Returns

`Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

### Defined in

[lib/tools/childrenError.ts:9](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/tools/childrenError.ts#L9)

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Type Parameters

• **T** *extends* `object`

### Parameters

• **error?**: [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`T`\>

### Returns

`Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Defined in

[lib/tools/childrenError.ts:16](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/tools/childrenError.ts#L16)
