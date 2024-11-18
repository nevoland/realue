[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReportArray

# Type Alias: ErrorReportArray\<T\>

> **ErrorReportArray**\<`T`\>: `{ readonly [K in keyof T as number]?: ErrorReport<T[K]> }` & `object` \| [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T** *extends* readonly `unknown`[]

## Defined in

[lib/types/ErrorReportArray.ts:4](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/types/ErrorReportArray.ts#L4)
