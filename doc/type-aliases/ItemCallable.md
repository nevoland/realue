[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / ItemCallable

# Type Alias: ItemCallable\<T\>

> **ItemCallable**\<`T`\>: (`itemIndex`) => `object`() => [`NevoProps`](NevoProps.md)\<readonly `T`[]\> & `object` \| `object`

Returns the NEVO props for the item at the specified `itemIndex`. If `itemIndex` is not provided, returns the NEVO props for the entire array.

The `add` and `remove` mutators are either both defined (when the array is mutable) or both `undefined` (when it is read-only).

## Type Parameters

• **T**

## Param

The index of the item for which to generate the props.

## Defined in

[lib/types/ItemCallable.ts:16](https://github.com/nevoland/realue/blob/ae52e491a42ea548f37572294c8879745c3e1bb1/lib/types/ItemCallable.ts#L16)
