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

[lib/tools/disable.ts:17](https://github.com/nevoland/realue/blob/0e2c9c1c8fa8490674c8cc5404b4ee41b440a4dd/lib/tools/disable.ts#L17)
