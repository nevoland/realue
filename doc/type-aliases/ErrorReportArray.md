[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportArray

# Type Alias: ErrorReportArray\<T\>

> **ErrorReportArray**\<`T`\>: `{ readonly [K in keyof T as number]?: ErrorReport<T[K]> }` & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/02eadad2b1348179ffb758c002c1a34797a6b7aa/lib/types/ErrorReportArray.ts#L4)
