[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / Select

# Type Alias: Select\<T, RequiredKeys, OmittedKeys\>

> **Select**\<`T`, `RequiredKeys`, `OmittedKeys`\>: `Omit`\<`T`, `RequiredKeys` \| `OmittedKeys`\> & `Required`\<`Pick`\<`T`, `RequiredKeys`\>\> & `{ [key in OmittedKeys]?: undefined }`

Updates the object type `T` to make `RequiredKeys` required and `OmittedKeys` optionally `undefined`.

## Type Parameters

• **T**

• **RequiredKeys** *extends* keyof `T` = `never`

• **OmittedKeys** *extends* keyof `T` = `never`

## Defined in

[lib/types/Select.ts:4](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/types/Select.ts#L4)
