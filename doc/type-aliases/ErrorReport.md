[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReport

# Type Alias: ErrorReport\<T\>

> **ErrorReport**\<`T`\>: [`0`] *extends* [`1` & `T`] ? `any` : [`unknown`] *extends* [`T`] ? `unknown` : [`NonNullable`\<`T`\>] *extends* [readonly `unknown`[]] ? [`ErrorReportArray`](ErrorReportArray.md)\<`NonNullable`\<`T`\>\> : [`NonNullable`\<`T`\>] *extends* [`object`] ? [`ErrorReportObject`](ErrorReportObject.md)\<`NonNullable`\<`T`\>\> : [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T**

## Defined in

[lib/types/ErrorReport.ts:5](https://github.com/nevoland/realue/blob/83709f9838ee56af94dc6598a0bb03579ef097ee/lib/types/ErrorReport.ts#L5)
