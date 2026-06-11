[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useResizeEffect

# Function: useResizeEffect()

> **useResizeEffect**(`element`, `callback`, `options`): `void`

Reports changes to the dimensions of the border box of an `element` by calling a provided `callback`.

## Parameters

• **element**: `undefined` \| `null` \| `false` \| `Element`

The element on which to observe resize events.

• **callback**

The callback called by the observer with the mutation list and the observer.

• **options**: [`ResizeEffectOptions`](../type-aliases/ResizeEffectOptions.md) = `EMPTY_OBJECT`

Observation options.

## Returns

`void`

## Defined in

[lib/hooks/useResizeEffect.ts:16](https://github.com/nevoland/realue/blob/52b891d9400f41f667766205b82049d537ca8c59/lib/hooks/useResizeEffect.ts#L16)
