[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReport

# Type Alias: ErrorReport\<T\>

> **ErrorReport**\<`T`\>: [`0`] *extends* [`1` & `T`] ? `any` : [`unknown`] *extends* [`T`] ? `unknown` : [`NonNullable`\<`T`\>] *extends* [readonly `unknown`[]] ? [`ErrorReportArray`](ErrorReportArray.md)\<`NonNullable`\<`T`\>\> : [`NonNullable`\<`T`\>] *extends* [`object`] ? [`ErrorReportObject`](ErrorReportObject.md)\<`NonNullable`\<`T`\>\> : [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T**

## Defined in

[lib/types/ErrorReport.ts:5](https://github.com/nevoland/realue/blob/bc47ffcae8699bbac13ee4e99253fa39382cf1da/lib/types/ErrorReport.ts#L5)
