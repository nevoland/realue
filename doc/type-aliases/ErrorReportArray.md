[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportArray

# Type Alias: ErrorReportArray\<T\>

> **ErrorReportArray**\<`T`\>: `{ readonly [K in keyof T as number]?: ErrorReport<T[K]> }` & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/0e31f412c843509c611a819f4eb2d8d824b887cf/lib/types/ErrorReportArray.ts#L4)
