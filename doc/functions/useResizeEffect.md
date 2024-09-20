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

[lib/hooks/useResizeEffect.ts:15](https://github.com/nevoland/realue/blob/b0a59c2aa8e01af359fa1933a59bc53236ad21c6/lib/hooks/useResizeEffect.ts#L15)
