[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useArray

# Function: useArray()

> **useArray**\<`A`, `G`, `T`, `E`\>(`props`, `itemId`): [`ItemCallable`](../interfaces/ItemCallable.md)\<`T`, `E`\>

Takes an array and returns a function that generates the required props for handling an array item value.
That function also contains three callables: `loop`, `add`, and `remove`.

## Type Parameters

• **A** *extends* `undefined` \| readonly `any`[]

• **G** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`NonNullable`\<`A`\>\>

• **T** = `NonNullable`\<`A`\> *extends* readonly `H`[] ? `H` : `never`

• **E** *extends* [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`any`\> = [`ErrorReport`](../type-aliases/ErrorReport.md)\<`T`\>

## Parameters

• **props**: [`NevoProps`](../type-aliases/NevoProps.md)\<`A`, `G`\>

Properties according to the NEVO pattern, where the `value` holds an array.

• **itemId**: [`ItemId`](../type-aliases/ItemId.md)\<`T`\> = `itemIdDefault`

An optional function that returns a unique identifier for a given array `item`.

## Returns

[`ItemCallable`](../interfaces/ItemCallable.md)\<`T`, `E`\>

The `item` function that returns the props for a specific item `index`.

## Defined in

[lib/hooks/useArray.ts:32](https://github.com/nevoland/realue/blob/ed7bf05d18ab306716405186215c6769c3cbd8d7/lib/hooks/useArray.ts#L32)
