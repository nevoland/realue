[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useRefresh

# Function: useRefresh()

> **useRefresh**(): `RefreshResult`

Returns a function that triggers a refresh of the element.

The returned function has a `value` property set to the `boolean` value that toggles between `true` and `false` to trigger the refresh. This is useful if, in addition to a refresh, the dependencies of a hook need to be refreshed as well.

## Returns

`RefreshResult`

A function that triggers a refresh, with the `value` property.

## Defined in

[lib/hooks/useRefresh.ts:15](https://github.com/nevoland/realue/blob/4e20bc322d155f810c06416a8a99a0b7b6c6ba28/lib/hooks/useRefresh.ts#L15)
