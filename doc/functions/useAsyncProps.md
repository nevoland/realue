[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useAsyncProps

# Function: useAsyncProps()

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `"onChange"`, `never`\>

Asynchronously handles getting the `value` and its `onChange`s by `handle`ing queries and `subscribing` to updates.

If `options.value(name)` is set, uses the defined return value (a "query") and passes it to `options.handle(query)`. If `options.value(name)` returns an undefined value, nothing happens.

If `options.onChange(value, name)` is set, uses the defined return value (a "query") and passes it to `options.handle(query)`. If `options.onChange(value, name)` returns an undefined value, nothing happens.

The `options.handle(query)` function returns asynchronously (or, if needed, synchronously) a `value` that gets returned in the result.

Asynchronous tasks can be tracked with the returned `status` property, and aborted using the returned `onAbort()` method. Ongoing operations are automatically aborted when the element that runs this hook unmounts.

The asynchronous task that gets the `value` can be re-executed using the returned `onRefresh()` method.

If `options.subscribe(query, onRefresh)` is defined, it is called everytime a new `query` is returned by `options.value(name)`, and passed along with the `onRefresh(query)` method to trigger a refresh. The `onRefresh(query)` is called with a change query to ignore the queries that emanate from the element using this hook. The `options.subscribe(query, onRefresh)` function can return a function that gets called before a new `options.subcribe(query, onRefresh)` call is made or when the element unmounts, enabling unsubscription logic to happen.

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"onChange"`, `"props"`\>

Contains the optional `value` and `onChange` query builders, the required `handle(query)` method, the optional `subscribe(query, onRefresh)` method, and the optional parent props according to the NEVO pattern (with support for `status` and `onChangeStatus`).

• **dependencies?**: `Inputs`

List of values that, when changing, trigger a new asynchronous `value` loading task if `options.value(name)` is set, refresh the subscription if `options.subscribe(query, onRefresh)` is set, and update the definition of the returned `onChange` function.

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `"onChange"`, `never`\>

The properties according to the NEVO pattern, with the `status` of the ongoing task, and the `onRefresh()` and `onAbort()` methods.

### Defined in

[lib/hooks/useAsyncProps.ts:76](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L76)

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: `never`

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Defined in

[lib/hooks/useAsyncProps.ts:80](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L80)

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `never`, `"onChange"` \| `"props"`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Defined in

[lib/hooks/useAsyncProps.ts:86](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L86)

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: `never`

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Defined in

[lib/hooks/useAsyncProps.ts:90](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L90)

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"onChange"` \| `"props"`, `never`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Defined in

[lib/hooks/useAsyncProps.ts:96](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L96)

## useAsyncProps(options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`options`, `dependencies`?): `AsyncPropsResult`\<`T`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"props"`, `"onChange"`\>

• **dependencies?**: `Inputs`

### Returns

`AsyncPropsResult`\<`T`\>

### Defined in

[lib/hooks/useAsyncProps.ts:100](https://github.com/nevoland/realue/blob/3725e41dc2da74d7ef5636bc888841beee7f9b39/lib/hooks/useAsyncProps.ts#L100)
