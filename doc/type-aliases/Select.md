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

[lib/types/Select.ts:4](https://github.com/nevoland/realue/blob/ed7bf05d18ab306716405186215c6769c3cbd8d7/lib/types/Select.ts#L4)
