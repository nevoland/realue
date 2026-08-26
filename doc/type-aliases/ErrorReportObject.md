[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportObject

# Type Alias: ErrorReportObject\<T\>

> **ErrorReportObject**\<`T`\>: `unknown` *extends* `T` ? `unknown` : `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* `object`

## Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/bc47ffcae8699bbac13ee4e99253fa39382cf1da/lib/types/ErrorReportObject.ts#L4)
