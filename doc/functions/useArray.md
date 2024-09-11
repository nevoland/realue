[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useArray

# Function: useArray()

> **useArray**\<`A`, `G`, `T`, `E`\>(`props`, `itemId`): [`ItemCallable`](../interfaces/ItemCallable.md)\<`T`, `E`\>

Takes an array and returns a function that generates the required props for handling an array item value.
That function also contains three callables: `loop`, `add`, and `remove`.

## Type Parameters

• **A** *extends* `undefined` \| `any`[]

• **G** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`A`\>\>

• **T** = `A` *extends* `H`[] ? `H` : `never`

• **E** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`any`\> = [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\>

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`A`, `G`\>

The props holding the array `value`.

• **itemId**: [`ItemId`](../type-aliases/ItemId.md)\<`T`\> = `itemIdDefault`

An optional function that returns a unique identifier for a given array `item`.

## Returns

[`ItemCallable`](../interfaces/ItemCallable.md)\<`T`, `E`\>

The `item` function that returns the props for a specific item `index`.

## Defined in

[lib/hooks/useArray.ts:31](https://github.com/nevoland/realue/blob/f4b19517a70849cd9acdbd330ff073726e13ba1f/lib/hooks/useArray.ts#L31)
