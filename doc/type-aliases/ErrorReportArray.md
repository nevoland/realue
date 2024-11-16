[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportArray

# Type Alias: ErrorReportArray\<T\>

> **ErrorReportArray**\<`T`\>: `{ readonly [K in keyof T as number]?: ErrorReport<T[K]> }` & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/310f29149b1c369e25b2d9305043389204bd13e0/lib/types/ErrorReportArray.ts#L4)
