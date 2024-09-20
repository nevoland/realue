[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / useAsyncProps

# Function: useAsyncProps()

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `"onChange"`, `never`\>

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

• **props**: `undefined`

Optional properties according to the NEVO pattern, where the `value` sets the initial value of the returned `value`. Optionally supports `status` and `onChangeStatus` for tracking `status` updates.

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"onChange"`, `never`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `"onChange"`, `never`\>

The properties according to the NEVO pattern, with the

### Defined in

[lib/hooks/useAsyncProps.ts:69](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L69)

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **props**: `undefined`

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `never`, `"onChange"`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T` \| `undefined`\>, `never`, `"onChange"`\>

### Defined in

[lib/hooks/useAsyncProps.ts:74](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L74)

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **props**: [`Select`](../type-aliases/Select.md)\<`NevosProps`\<`T`\>, `never`, `"onChange"`\>

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"onChange"`, `never`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Defined in

[lib/hooks/useAsyncProps.ts:79](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L79)

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `never`, `"onChange"`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **props**: [`Select`](../type-aliases/Select.md)\<`NevosProps`\<`T`\>, `never`, `"onChange"`\>

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `never`, `"onChange"`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `never`, `"onChange"`\>

### Defined in

[lib/hooks/useAsyncProps.ts:84](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L84)

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): [`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **props**: `NevosProps`\<`T`\>

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `"onChange"`, `never`\>

• **dependencies?**: `Inputs`

### Returns

[`Select`](../type-aliases/Select.md)\<`AsyncPropsResult`\<`T`\>, `"onChange"`, `never`\>

### Defined in

[lib/hooks/useAsyncProps.ts:89](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L89)

## useAsyncProps(props, options, dependencies)

> **useAsyncProps**\<`T`, `Q`\>(`props`, `options`, `dependencies`?): `AsyncPropsResult`\<`T`\>

### Type Parameters

• **T**

• **Q**

### Parameters

• **props**: `NevosProps`\<`T`\>

• **options**: [`Select`](../type-aliases/Select.md)\<`AsyncPropsOptions`\<`T`, `Q`\>, `never`, `"onChange"`\>

• **dependencies?**: `Inputs`

### Returns

`AsyncPropsResult`\<`T`\>

### Defined in

[lib/hooks/useAsyncProps.ts:94](https://github.com/nevoland/realue/blob/3ee19205f96a631a4bd1adc96c572cca62bfa0d1/lib/hooks/useAsyncProps.ts#L94)
