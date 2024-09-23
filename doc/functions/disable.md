[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / disable

# Function: disable()

> **disable**(`condition`?): `null` \| `object`

Returns the props with `onChange` and `onChangeError` the `condition` is truthy. Useful for disabling edits in some cases.

## Parameters

• **condition?**: `boolean` \| [`PromiseState`](../type-aliases/PromiseState.md)\<`unknown`\>

Boolean that disables changes if true, or `PromiseState`

## Returns

`null` \| `object`

The props necessary to disable changes or not.

## Example

```tsx
<>
  <Component {...props} {...disable(promiseState.status === "pending")} />
  <Component {...props} {...disable(promiseState)} />
</>
```

## Defined in

[lib/tools/disable.ts:17](https://github.com/nevoland/realue/blob/bda2c81a122722d2211255b398b35c625b1e6a1c/lib/tools/disable.ts#L17)
