[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportArray

# Type Alias: ErrorReportArray\<T\>

> **ErrorReportArray**\<`T`\>: `{ readonly [K in keyof T as number]?: ErrorReport<T[K]> }` & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/fecd9dbe42b1c423720c721f1e676e4fdf968b4d/lib/types/ErrorReportArray.ts#L4)
