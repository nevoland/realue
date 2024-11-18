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

[lib/types/Select.ts:4](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/types/Select.ts#L4)
