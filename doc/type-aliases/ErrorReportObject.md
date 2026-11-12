[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportObject

# Type Alias: ErrorReportObject\<T\>

> **ErrorReportObject**\<`T`\>: `unknown` *extends* `T` ? `unknown` : `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* `object`

## Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/types/ErrorReportObject.ts#L4)
