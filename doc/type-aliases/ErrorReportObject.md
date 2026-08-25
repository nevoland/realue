[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportObject

# Type Alias: ErrorReportObject\<T\>

> **ErrorReportObject**\<`T`\>: `unknown` *extends* `T` ? `unknown` : `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* `object`

## Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/83709f9838ee56af94dc6598a0bb03579ef097ee/lib/types/ErrorReportObject.ts#L4)
