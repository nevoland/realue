[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useResizeEffect

# Function: useResizeEffect()

> **useResizeEffect**(`element`, `callback`, `options`): `void`

Reports changes to the dimensions of the border box of an `element` by calling a provided `callback`.

## Parameters

• **element**: `undefined` \| `null` \| `false` \| `Element`

The element on which to observe resize events.

• **callback**: `ResizeObserverCallback`

The callback called by the observer with the mutation list and the observer.

• **options**: [`ResizeEffectOptions`](../type-aliases/ResizeEffectOptions.md) = `EMPTY_OBJECT`

Observation options.

## Returns

`void`

## Defined in

[lib/hooks/useResizeEffect.ts:16](https://github.com/nevoland/realue/blob/61d16d842d4c11bef8dfade29a565911353a8f17/lib/hooks/useResizeEffect.ts#L16)
