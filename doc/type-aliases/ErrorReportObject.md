[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportObject

# Type Alias: ErrorReportObject\<T\>

> **ErrorReportObject**\<`T`\>: `unknown` *extends* `T` ? `unknown` : `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* `object`

## Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/types/ErrorReportObject.ts#L4)
