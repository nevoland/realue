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

[lib/hooks/useRefresh.ts:15](https://github.com/nevoland/realue/blob/009c0e8af9c57144ac590f9427129c44b47b92fb/lib/hooks/useRefresh.ts#L15)
