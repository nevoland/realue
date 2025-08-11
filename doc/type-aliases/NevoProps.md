[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / NevoProps

# Type Alias: NevoProps\<T, E\>

> **NevoProps**\<`T`, `E`\>: `object` \| `object`

Set of properties that define the NEVO pattern:
- `name`: The name used to identify the entity represented by the `value`.
- `error`: An error object describing issues to be shown.
- `value`: The value to be handled by a component.
- `onChange`: The callback the component uses to notify the parent component about changes of the `value`.
- `onChangeError`: The callback the component uses to notify the parent component about changes of the `error`.

## Type Parameters

• **T**

• **E** *extends* [`ErrorReport`](ErrorReport.md)\<`any`\> = [`ErrorReport`](ErrorReport.md)\<`T`\>

## Defined in

[lib/types/NevoProps.ts:14](https://github.com/nevoland/realue/blob/131459fc0cd410aac7d8aca18b8f481f26a49eb4/lib/types/NevoProps.ts#L14)
