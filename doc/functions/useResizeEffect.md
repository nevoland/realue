[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useResizeEffect

# Function: useResizeEffect()

> **useResizeEffect**(`element`, `callback`, `options`): `void`

Reports changes to the dimensions of an `element` by calling a provided `callback` with that `element`.
The `callback` is called once immediately, then each time the dimensions of the `element` or those of an ancestor (when `parents` is set) change.
Does nothing if `element` is falsy or if `ResizeObserver` is not available.

## Parameters

• **element**: `undefined` \| `null` \| `false` \| `Element`

The element on which to observe resize events.

• **callback**

The callback called with the observed `element`.

• **options**: [`ResizeEffectOptions`](../type-aliases/ResizeEffectOptions.md) = `EMPTY_OBJECT`

Observation options: whether to also observe the `parents` of the `element`, and which `box` model to observe on the `element`.

## Returns

`void`

## Defined in

[lib/hooks/useResizeEffect.ts:17](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useResizeEffect.ts#L17)
