[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / NevoProps

# Type Alias: NevoProps\<T, E\>

> **NevoProps**\<`T`, `E`\>: `object`

Set of properties that define the NEVO pattern:
- `name`: The name used to identify the entity represented by the `value`.
- `error`: An error object describing issues to be shown.
- `value`: The value to be handled by a component.
- `onChange`: The callback the component uses to notify the parent component about changes of the `value`.
- `onChangeError`: The callback the component uses to notify the parent component about changes of the `error`.

## Type Parameters

• **T**

• **E** *extends* [`ErrorReport`](ErrorReport.md)\<`any`\> = [`ErrorReport`](ErrorReport.md)\<`T`\>

## Type declaration

### error?

> `optional` **error**: `E`

An error object describing issues to be shown.

### name

> **name**: [`Name`](Name.md)

The name used to identify the entity represented by the `value`.

### onChange?

> `optional` **onChange**: [`ValueMutator`](ValueMutator.md)\<`undefined` *extends* `NoInfer`\<`T`\> ? `Readonly`\<`T`\> \| `undefined` : `Readonly`\<`T`\>\>

The callback the component uses to notify the parent component about changes of the `value`.

### onChangeError?

> `optional` **onChangeError**: [`ErrorMutator`](ErrorMutator.md)\<`NoInfer`\<`E`\>\>

The callback the component uses to notify the parent component about changes of the `error`.

### value

> **value**: `undefined` *extends* `T` ? `Readonly`\<`T`\> \| `undefined` : `Readonly`\<`T`\>

The value to be handled by a component.

## Defined in

[lib/types/NevoProps.ts:14](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/types/NevoProps.ts#L14)
