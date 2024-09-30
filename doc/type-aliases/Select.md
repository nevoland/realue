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

[lib/types/Select.ts:4](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/types/Select.ts#L4)
