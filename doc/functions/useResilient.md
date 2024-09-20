[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useResilient

# Function: useResilient()

> **useResilient**\<`T`\>(`value`, `shouldUpdate`): `T`

Returns the provided `value` when `shouldUpdate`, called with the new value and the current one, returns `true`. Otherwise, returns the current one.
By default, `shouldUpdate` returns `true` if `value` is not `undefined`.

## Type Parameters

• **T**

## Parameters

• **value**: `T`

The `value` to make resilient.

• **shouldUpdate** = `defaultUpdate`

The function called with the new value and the current one that returns `true` if the current value should be updated to the new one.

## Returns

`T`

The current value, last udpated when `shouldUpdate` returned `true`.

## Defined in

[lib/hooks/useResilient.ts:11](https://github.com/nevoland/realue/blob/23357baeee67e2e83a0bceccc257348ca52e5775/lib/hooks/useResilient.ts#L11)