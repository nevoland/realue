[**realue**](../README.md) • **Docs**

***

[realue](../README.md) / childrenError

# Function: childrenError()

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

Returns the mapping of property names or item indices to their error reports found in the provided `error` report.
If `error` is a list of strings (i.e., only contains errors for the entire value) or is `undefined`, returns `undefined`.

Note that the returned mapping also contains the global error stored at the empty string key `""`, if any, although it is not reflected in the returned type.

### Type Parameters

• **T** *extends* readonly `any`[]

### Parameters

• **error?**: [`ErrorReportArray`](../type-aliases/ErrorReportArray.md)\<`T`\>

The error report of an object or an array.

### Returns

`Partial`\<`{ [K in keyof T as number]: ErrorReport<T[K]> }`\> \| `undefined`

The mapping of children error reports, or `undefined` if there are none.

### Example

```ts
childrenError({ "": ["Invalid value."], name: ["Missing name."] })?.name; // ["Missing name."]
childrenError(["Invalid value."]); // undefined
```

### Defined in

[lib/tools/childrenError.ts:24](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/childrenError.ts#L24)

## childrenError(error)

> **childrenError**\<`T`\>(`error`?): `Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Type Parameters

• **T** *extends* `object`

### Parameters

• **error?**: [`ErrorReportObject`](../type-aliases/ErrorReportObject.md)\<`T`\>

### Returns

`Partial`\<`{ [K in keyof T]: ErrorReport<T[K]> }`\> \| `undefined`

### Defined in

[lib/tools/childrenError.ts:31](https://github.com/nevoland/realue/blob/f33481a3ee1cc20209f6c3f73f221a3b71e7927a/lib/tools/childrenError.ts#L31)
