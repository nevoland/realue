[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportObject

# Type Alias: ErrorReportObject\<T\>

> **ErrorReportObject**\<`T`\>: `unknown` *extends* `T` ? `unknown` : `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* `object`

## Defined in

[lib/types/ErrorReportObject.ts:4](https://github.com/nevoland/realue/blob/99290dc5229b4a4580b710444691711a0467e392/lib/types/ErrorReportObject.ts#L4)
