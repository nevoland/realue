[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useRefList

# Function: useRefList()

> **useRefList**\<`T`\>(...`refList`): `RefCallback`\<`T`\> \| `null`

Combines a list of refs into a single callable ref, updating the list of refs to the value it is called with.
Callable refs are called with the value, and object refs get their `current` property set to it.

## Type Parameters

• **T**

## Parameters

• ...**refList**: (`undefined` \| `Ref`\<`T`\>)[]

The list of refs to combine.

## Returns

`RefCallback`\<`T`\> \| `null`

Callable ref that updates the list of refs to the value it is called with, or `null` if all provided refs are nullish.

## Defined in

[lib/hooks/useRefList.ts:11](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useRefList.ts#L11)
