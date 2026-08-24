[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ErrorReport

# Type Alias: ErrorReport\<T\>

> **ErrorReport**\<`T`\>: [`unknown`] *extends* [`T`] ? `unknown` : [`NonNullable`\<`T`\>] *extends* [readonly `unknown`[]] ? [`ErrorReportArray`](ErrorReportArray.md)\<`NonNullable`\<`T`\>\> : [`NonNullable`\<`T`\>] *extends* [`object`] ? [`ErrorReportObject`](ErrorReportObject.md)\<`NonNullable`\<`T`\>\> : [`ErrorReportValue`](ErrorReportValue.md)

## Type Parameters

• **T**

## Defined in

[lib/types/ErrorReport.ts:5](https://github.com/nevoland/realue/blob/0164e6c50db362cbf82dd512b953fada7d2b84cc/lib/types/ErrorReport.ts#L5)
