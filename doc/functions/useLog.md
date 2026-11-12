[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useLog

# Function: useLog()

> **useLog**(`title`, `props`): `void`

Logs the properties that changed since the last render in a console group named after `title`, displaying their `current` and `previous` values in a table.
Only logs when at least one of the property values changed. Intended for debugging purposes.

## Parameters

• **title**: `string`

Title of the console group.

• **props**: `Props`

Properties to track.

## Returns

`void`

## Example

```tsx
function Component(props: NevoProps<string>) {
  useLog("Component", props);
  // ...
}
```

## Defined in

[lib/hooks/useLog.ts:21](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/hooks/useLog.ts#L21)
