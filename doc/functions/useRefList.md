[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useRefList

# Function: useRefList()

> **useRefList**\<`T`\>(...`refList`): `RefCallback`\<`T`\> \| `null`

Combines a list of refs into a single callable ref, updating the list of refs to the value it is called with.

## Type Parameters

• **T**

## Parameters

• ...**refList**: (`undefined` \| `Ref`\<`T`\>)[]

The list of refs to combine.

## Returns

`RefCallback`\<`T`\> \| `null`

Callable ref that updates the list of refs to the value it is called with.

## Defined in

[lib/hooks/useRefList.ts:10](https://github.com/nevoland/realue/blob/4e20bc322d155f810c06416a8a99a0b7b6c6ba28/lib/hooks/useRefList.ts#L10)
