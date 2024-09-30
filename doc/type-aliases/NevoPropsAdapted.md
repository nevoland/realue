[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / NevoPropsAdapted

# Type Alias: NevoPropsAdapted\<T, K, E\>

> **NevoPropsAdapted**\<`T`, `K`, `E`\>: [`Property`](Property.md)\<\`$\{K\}Name\`, [`Name`](Name.md)\> & [`Property`](Property.md)\<\`$\{K\}Error\`, `E`\> & [`Property`](Property.md)\<`K`, `T`\> & [`Property`](Property.md)\<\`onChange$\{Capitalize\<K\>\}\`, [`ValueMutator`](ValueMutator.md)\<`T`\>\> & [`Property`](Property.md)\<\`onChange$\{Capitalize\<K\>\}Error\`, [`ErrorMutator`](ErrorMutator.md)\<`E`\>\>

## Type Parameters

• **T**

• **K** *extends* `string`

• **E** *extends* [`ErrorReport`](ErrorReport.md)\<`any`\> = [`ErrorReport`](ErrorReport.md)\<`T`\>

## Defined in

[lib/types/NevoPropsAdapted.ts:7](https://github.com/nevoland/realue/blob/8a6a0e0e2cd5cbfd6cdb8d7ce380fc07ff18b38d/lib/types/NevoPropsAdapted.ts#L7)
