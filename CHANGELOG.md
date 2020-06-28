# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.3.0](https://github.com/davidbonnet/realue/compare/v3.2.2...v3.3.0) (2020-06-28)


### Features

* **layout:** add basic event support ([82a5730](https://github.com/davidbonnet/realue/commit/82a5730abe26caac6797b7e133a6d7cd7c1bf0fa))


### Bug Fixes

* **layout:** simplify export ([7209a5b](https://github.com/davidbonnet/realue/commit/7209a5b4a6043cb1d3865e692ea69a740f4fead1))

### [3.2.2](https://github.com/davidbonnet/realue/compare/v3.2.1...v3.2.2) (2020-06-09)


### Bug Fixes

* **layout:** add ref support ([1e61171](https://github.com/davidbonnet/realue/commit/1e61171123e475af246b9c04b64c75d9c27e31d1))

### [3.2.1](https://github.com/davidbonnet/realue/compare/v3.2.0...v3.2.1) (2020-06-09)


### Bug Fixes

* **layout:** only stretch by default in containers ([b641d91](https://github.com/davidbonnet/realue/commit/b641d915225e2adcd67a4cb933d2aab9e1899ef9))

## [3.2.0](https://github.com/davidbonnet/realue/compare/v3.1.4...v3.2.0) (2020-06-08)


### Features

* add layout components ([c3ea49d](https://github.com/davidbonnet/realue/commit/c3ea49d5a0471f28d928cb2b000bdb8eda5af0fa))

### [3.1.4](https://github.com/davidbonnet/realue/compare/v3.1.3...v3.1.4) (2020-05-19)


### Bug Fixes

* **tools:** unable to name non-function component ([c332194](https://github.com/davidbonnet/realue/commit/c332194eda94d2b0db906ab37ad3f4e7525dd32c))

### [3.1.3](https://github.com/davidbonnet/realue/compare/v3.1.2...v3.1.3) (2020-05-19)


### Bug Fixes

* **tools:** component is not wrapped ([8cd6de8](https://github.com/davidbonnet/realue/commit/8cd6de83332dbb2311ab973e9c1ece6bc974f778))

### [3.1.2](https://github.com/davidbonnet/realue/compare/v3.1.1...v3.1.2) (2020-05-19)


### Bug Fixes

* **tools:** unable to set name on string component ([ed307c3](https://github.com/davidbonnet/realue/commit/ed307c3c85de3b2801a50e0f1b2b6efb3b06b113))

### [3.1.1](https://github.com/davidbonnet/realue/compare/v3.1.0...v3.1.1) (2020-05-19)


### Bug Fixes

* **tools:** component is not returned ([178774e](https://github.com/davidbonnet/realue/commit/178774e6534f80eaf1313e80ef1a7d2c82958bdf))

## [3.1.0](https://github.com/davidbonnet/realue/compare/v3.0.1...v3.1.0) (2020-05-19)


### Features

* add `setDisplayName()` ([2ec9057](https://github.com/davidbonnet/realue/commit/2ec90574dace47ac9441f01e699b37086f1f7bf6))

### [3.0.1](https://github.com/davidbonnet/realue/compare/v3.0.0...v3.0.1) (2020-05-01)


### Bug Fixes

* unused concurrently dependency ([fcd3358](https://github.com/davidbonnet/realue/commit/fcd3358c09beca03299bec56ef42c51c4fc0981c))

## [3.0.0](https://github.com/davidbonnet/realue/compare/v2.22.1...v3.0.0) (2020-05-01)


### ⚠ BREAKING CHANGES

* Children decorators have been reduced down to:
- withChildren
- withChild
See examples to understand how to migrate.

* feat(properties): add constant prop to resiliant

* fix(dom): use node.current if null

* feat(promises): add `on` listener helper

* feat(promises): add `waitUntil` promise helper

* feat(queries): update query middlewares

- Add `json` and `text` extractors
- BREAKING CHANGE: Replace `fetchJson` with `fetch`
- Update `QuerryError` with `value` prop containing the returned error
message from the API
- BREAKING CHANGE: Rename `split` into `branch`
- BREAKING CHANGE: Export query middlewares from `realue/queries`

* fix(queries): rename `branch`
* Rename `branch` into `branchQuery` and export
all query middlewares.

* feat(children): add `switchChild`

* feat(children): add `Null` component

* feat(properties): add `groupProps`

* feat(properties): update `groupProps`
* The `shouldMapOrKeys` argument is not necessary.

* docs: fix README for `suspendable`

* fix(properties): adjust updates in resilientProp

* fix(dom): correctly name `refreshable`

* feat(dom): add animation global listeners

* feat: add log registers

* feat(queries): add concurrent query middelware

* fix: correctly name concurrent

* fix(queries): fix concurrent result mapping

* fix(queries): correctly map over indexes

* docs: fix `initialValue` documentation

* feat(properties): add `box` and update `returned`

* docs: update `returned` documentation

* fix: rename `delayedProp` and `suspendedProp`
* Rename delayedProp and suspendedProp into
delayableProp and suspendableProp, respectively, to follow the naming
convention for decorators that trigger a behavior only if certain
props are set.

* fix(properties): optimize suspendableProp

Do not unecessarily update the element when the prop reverts back
to the previous value before the timeout.

* feat(hooks): Add withHook decorator

* feat: add `forwardNode`

* fix(dom): Use parent `onKeyDown`, if any

* feat(promise): Add `listenable`

* feat(caches): add `persistedProp` and `persisted`

* fix(caches): Stringify values

* fix(properties): correctly set prop in defaultProp

* feat(properties): add delayableHandler

* fix(properties): set values as constants

* feat(properties): add `dynamicProp` decorator

* feat(promises): add `untilOnline`
* Rename `waitUntil` to `until` and `waitFor` to `sleep`.

* fix(queries): check for offline case first

* fix(arrays): cast item name to string

An element name should always be a string for consistency and
to better integrate with the DOM.

* feat(resilientProp): add `delayName` option

* feat(properties): add `hasNotProps` tool

* fix(delayableProp): handle nil delayable prop

* feat(properties): default shouldHandle to false

`makeShouldHandle(shouldHandleOrKeys)` returns a function that always
returns false if `shouldHandleOrKeys` is `nil`.

### Features

* version 3 ([efd0848](https://github.com/davidbonnet/realue/commit/efd08480e730c952d4321c5461b7a9f1a7013105))

<a name="2.22.1"></a>
## [2.22.1](https://github.com/davidbonnet/realue/compare/v2.22.0...v2.22.1) (2019-07-06)


### Bug Fixes

* **dom:** use node.current if null ([b7cc7e0](https://github.com/davidbonnet/realue/commit/b7cc7e0))



<a name="2.22.0"></a>
# [2.22.0](https://github.com/davidbonnet/realue/compare/v2.21.0...v2.22.0) (2019-06-12)


### Bug Fixes

* **docs:** explain `delay` for `withBounds` ([b4d720d](https://github.com/davidbonnet/realue/commit/b4d720d))


### Features

* **tools:** add `omitted()` tool ([a3653c3](https://github.com/davidbonnet/realue/commit/a3653c3))



<a name="2.21.0"></a>
# [2.21.0](https://github.com/davidbonnet/realue/compare/v2.20.2...v2.21.0) (2019-06-12)


### Bug Fixes

* **docs:** add `resilient` documentation ([903586d](https://github.com/davidbonnet/realue/commit/903586d))
* **docs:** add `resilientProp` documentation ([8b59482](https://github.com/davidbonnet/realue/commit/8b59482))


### Features

* **dom:** add `refreshable`, update `refreshed` ([c3228d0](https://github.com/davidbonnet/realue/commit/c3228d0))



<a name="2.20.2"></a>
## [2.20.2](https://github.com/davidbonnet/realue/compare/v2.20.1...v2.20.2) (2019-06-10)


### Bug Fixes

* **promises:** Allow interval to be interrupted ([bb15ad6](https://github.com/davidbonnet/realue/commit/bb15ad6))



<a name="2.20.1"></a>
## [2.20.1](https://github.com/davidbonnet/realue/compare/v2.20.0...v2.20.1) (2019-06-03)


### Bug Fixes

* **values:** transformable adds onChange if set ([6b5ef7b](https://github.com/davidbonnet/realue/commit/6b5ef7b))



<a name="2.20.0"></a>
# [2.20.0](https://github.com/davidbonnet/realue/compare/v2.19.1...v2.20.0) (2019-06-03)


### Features

* **properties:** enable running handler once ([8af845c](https://github.com/davidbonnet/realue/commit/8af845c))



<a name="2.19.1"></a>
## [2.19.1](https://github.com/davidbonnet/realue/compare/v2.19.0...v2.19.1) (2019-06-02)


### Bug Fixes

* **properties:** render decorated components ([1b85008](https://github.com/davidbonnet/realue/commit/1b85008))



<a name="2.19.0"></a>
# [2.19.0](https://github.com/davidbonnet/realue/compare/v2.18.1...v2.19.0) (2019-06-02)


### Bug Fixes

* **properties:** correctly name setImmediateEffect ([2cb26eb](https://github.com/davidbonnet/realue/commit/2cb26eb))


### Features

* **properties:** add withGlobalEffect decorators ([699fecc](https://github.com/davidbonnet/realue/commit/699fecc))
* **values:** add flattenValue decorator ([e5237ec](https://github.com/davidbonnet/realue/commit/e5237ec))
* **values:** provide state to transformOnChange ([98cee83](https://github.com/davidbonnet/realue/commit/98cee83))



<a name="2.18.1"></a>
## [2.18.1](https://github.com/davidbonnet/realue/compare/v2.18.0...v2.18.1) (2019-05-21)


### Bug Fixes

* **dom:** also consider `node` as an `element` ([d000479](https://github.com/davidbonnet/realue/commit/d000479))



<a name="2.18.0"></a>
# [2.18.0](https://github.com/davidbonnet/realue/compare/v2.17.3...v2.18.0) (2019-05-21)


### Bug Fixes

* **docs:** correctly mention `onAddItem` ([e82815d](https://github.com/davidbonnet/realue/commit/e82815d))


### Features

* **dom:** add `withBounds` ([bec72b1](https://github.com/davidbonnet/realue/commit/bec72b1))



<a name="2.17.3"></a>
## [2.17.3](https://github.com/davidbonnet/realue/compare/v2.17.2...v2.17.3) (2019-05-15)


### Bug Fixes

* **setup:** use Babel helpers ([4aa4a03](https://github.com/davidbonnet/realue/commit/4aa4a03))



<a name="2.17.2"></a>
## [2.17.2](https://github.com/davidbonnet/realue/compare/v2.17.1...v2.17.2) (2019-04-28)


### Bug Fixes

* **immutables:** freeze empty objects ([4d6f91a](https://github.com/davidbonnet/realue/commit/4d6f91a))



<a name="2.17.1"></a>
## [2.17.1](https://github.com/davidbonnet/realue/compare/v2.17.0...v2.17.1) (2019-04-26)


### Bug Fixes

* **immutables:** handle nil path in setPath() ([d09c629](https://github.com/davidbonnet/realue/commit/d09c629))



<a name="2.17.0"></a>
# [2.17.0](https://github.com/davidbonnet/realue/compare/v2.16.1...v2.17.0) (2019-04-26)


### Features

* **immutables:** add setPath() ([28676b7](https://github.com/davidbonnet/realue/commit/28676b7))



<a name="2.16.1"></a>
## [2.16.1](https://github.com/davidbonnet/realue/compare/v2.16.0...v2.16.1) (2019-04-09)


### Bug Fixes

* **array:** ensure item names are numbers ([70e0462](https://github.com/davidbonnet/realue/commit/70e0462))



<a name="2.16.0"></a>
# [2.16.0](https://github.com/davidbonnet/realue/compare/v2.15.1...v2.16.0) (2019-04-01)


### Features

* **properties:** add scoped decorators ([1b8be46](https://github.com/davidbonnet/realue/commit/1b8be46))
* **tools:** add picked() helper ([de4347c](https://github.com/davidbonnet/realue/commit/de4347c))



<a name="2.15.1"></a>
## [2.15.1](https://github.com/davidbonnet/realue/compare/v2.15.0...v2.15.1) (2019-04-01)


### Bug Fixes

* **values:** correctly pick transforms from props ([0bfab1d](https://github.com/davidbonnet/realue/commit/0bfab1d))



<a name="2.15.0"></a>
# [2.15.0](https://github.com/davidbonnet/realue/compare/v2.14.2...v2.15.0) (2019-04-01)


### Bug Fixes

* **logProps:** only warn when useless render ([1f3a023](https://github.com/davidbonnet/realue/commit/1f3a023))


### Features

* **lifecycle:** add withImmediateEffect ([a5837ce](https://github.com/davidbonnet/realue/commit/a5837ce))
* **tools:** add replaceAll ([a874e1a](https://github.com/davidbonnet/realue/commit/a874e1a))
* **values:** optimize transformable ([0600eee](https://github.com/davidbonnet/realue/commit/0600eee))



<a name="2.14.2"></a>
## [2.14.2](https://github.com/davidbonnet/realue/compare/v2.14.1...v2.14.2) (2019-03-20)


### Bug Fixes

* **queries:** disable logging in production ([cdece9a](https://github.com/davidbonnet/realue/commit/cdece9a))



<a name="2.14.1"></a>
## [2.14.1](https://github.com/davidbonnet/realue/compare/v2.14.0...v2.14.1) (2019-03-20)


### Bug Fixes

* **properties:** correctly name promisedProp ([b9507fb](https://github.com/davidbonnet/realue/commit/b9507fb))
* **properties:** return pulled value in synced ([1fc5578](https://github.com/davidbonnet/realue/commit/1fc5578))
* **properties:** return value in wrapped method ([05d86f3](https://github.com/davidbonnet/realue/commit/05d86f3))



<a name="2.14.0"></a>
# [2.14.0](https://github.com/davidbonnet/realue/compare/v2.13.5...v2.14.0) (2019-03-20)


### Bug Fixes

* **properties:** log properties on mount ([bdc5ebe](https://github.com/davidbonnet/realue/commit/bdc5ebe))


### Features

* **properties:** enhance logProps ([ff8d840](https://github.com/davidbonnet/realue/commit/ff8d840))



<a name="2.13.5"></a>
## [2.13.5](https://github.com/davidbonnet/realue/compare/v2.13.4...v2.13.5) (2019-03-20)


### Bug Fixes

* **promises:** also set error to undefined ([2dfc327](https://github.com/davidbonnet/realue/commit/2dfc327))



<a name="2.13.4"></a>
## [2.13.4](https://github.com/davidbonnet/realue/compare/v2.13.3...v2.13.4) (2019-03-19)


### Bug Fixes

* **promises:** set unresolved value to undefined ([76d9f1f](https://github.com/davidbonnet/realue/commit/76d9f1f))



<a name="2.13.3"></a>
## [2.13.3](https://github.com/davidbonnet/realue/compare/v2.13.2...v2.13.3) (2019-03-18)


### Bug Fixes

* **properties:** correctly set names ([c6d85e4](https://github.com/davidbonnet/realue/commit/c6d85e4))
* **queries:** use provided route method if any ([24eb6c8](https://github.com/davidbonnet/realue/commit/24eb6c8))



<a name="2.13.2"></a>
## [2.13.2](https://github.com/davidbonnet/realue/compare/v2.13.1...v2.13.2) (2019-03-14)


### Bug Fixes

* **properties:** cancel delayed prop on change ([8de7ea1](https://github.com/davidbonnet/realue/commit/8de7ea1))



<a name="2.13.1"></a>
## [2.13.1](https://github.com/davidbonnet/realue/compare/v2.13.0...v2.13.1) (2019-03-14)


### Bug Fixes

* **properties:** set correct name for initialProp ([c8a190e](https://github.com/davidbonnet/realue/commit/c8a190e))



<a name="2.13.0"></a>
# [2.13.0](https://github.com/davidbonnet/realue/compare/v2.12.1...v2.13.0) (2019-03-11)


### Features

* **promises:** add `timeout` and `interval` ([c982237](https://github.com/davidbonnet/realue/commit/c982237))



<a name="2.12.1"></a>
## [2.12.1](https://github.com/davidbonnet/realue/compare/v2.12.0...v2.12.1) (2019-03-10)


### Bug Fixes

* **query:** set bad request status for fetch issue ([209d919](https://github.com/davidbonnet/realue/commit/209d919))



<a name="2.12.0"></a>
# [2.12.0](https://github.com/davidbonnet/realue/compare/v2.11.5...v2.12.0) (2019-03-10)


### Features

* **tools:** add $() element creator ([3562e86](https://github.com/davidbonnet/realue/commit/3562e86))



<a name="2.11.5"></a>
## [2.11.5](https://github.com/davidbonnet/realue/compare/v2.11.4...v2.11.5) (2019-03-06)


### Bug Fixes

* **array:** correctly use current props for onRemove ([0979df5](https://github.com/davidbonnet/realue/commit/0979df5))



<a name="2.11.4"></a>
## [2.11.4](https://github.com/davidbonnet/realue/compare/v2.11.3...v2.11.4) (2019-03-05)


### Bug Fixes

* **strings:** remove branch usage for stability ([98bd806](https://github.com/davidbonnet/realue/commit/98bd806))
* only update props when necessary ([d3a1a41](https://github.com/davidbonnet/realue/commit/d3a1a41))



<a name="2.11.3"></a>
## [2.11.3](https://github.com/davidbonnet/realue/compare/v2.11.2...v2.11.3) (2019-03-05)


### Bug Fixes

* **values:** correctly init `defaultValue` ([1c7077d](https://github.com/davidbonnet/realue/commit/1c7077d))



<a name="2.11.2"></a>
## [2.11.2](https://github.com/davidbonnet/realue/compare/v2.11.1...v2.11.2) (2019-03-04)


### Bug Fixes

* **dom:** add missing DOM props to `domProps` ([333f8aa](https://github.com/davidbonnet/realue/commit/333f8aa))



<a name="2.11.1"></a>
## [2.11.1](https://github.com/davidbonnet/realue/compare/v2.11.0...v2.11.1) (2019-03-04)


### Bug Fixes

* **queries:** do not aggregate single queries ([7e61aa7](https://github.com/davidbonnet/realue/commit/7e61aa7))



<a name="2.11.0"></a>
# [2.11.0](https://github.com/davidbonnet/realue/compare/v2.10.0...v2.11.0) (2019-03-04)


### Bug Fixes

* **promises:** only attach promise values ([5276c93](https://github.com/davidbonnet/realue/commit/5276c93))


### Features

* **tools:** add `isPromise` ([5113c1f](https://github.com/davidbonnet/realue/commit/5113c1f))



<a name="2.10.0"></a>
# [2.10.0](https://github.com/davidbonnet/realue/compare/v2.9.1...v2.10.0) (2019-03-04)


### Features

* **object:** add `objectProp` and `setProperties` ([039f43a](https://github.com/davidbonnet/realue/commit/039f43a))



<a name="2.9.1"></a>
## [2.9.1](https://github.com/davidbonnet/realue/compare/v2.9.0...v2.9.1) (2019-02-27)


### Bug Fixes

* **queries:** do not request falsy queries ([29a147c](https://github.com/davidbonnet/realue/commit/29a147c))



<a name="2.9.0"></a>
# [2.9.0](https://github.com/davidbonnet/realue/compare/v2.8.0...v2.9.0) (2019-02-26)


### Features

* **dom:** add `withNode` ([d4f11e2](https://github.com/davidbonnet/realue/commit/d4f11e2))



<a name="2.8.0"></a>
# [2.8.0](https://github.com/davidbonnet/realue/compare/v2.7.1...v2.8.0) (2019-02-26)


### Features

* **dom:** add event param to key handler ([508238b](https://github.com/davidbonnet/realue/commit/508238b))



<a name="2.7.1"></a>
## [2.7.1](https://github.com/davidbonnet/realue/compare/v2.7.0...v2.7.1) (2019-02-26)


### Bug Fixes

* **properties:** apply debouncer in `delayedProp` ([af54f3b](https://github.com/davidbonnet/realue/commit/af54f3b))
* **setup:** revert standard-version back to v4.4 ([84be875](https://github.com/davidbonnet/realue/commit/84be875))



<a name="2.7.0"></a>
# [2.7.0](https://github.com/davidbonnet/realue/compare/v2.6.0...v2.7.0) (2019-02-26)


### Features

* **tools:** add `different` ([0771f0a](https://github.com/davidbonnet/realue/commit/0771f0a))


<a name="2.6.0"></a>
# [2.6.0](https://github.com/davidbonnet/realue/compare/v2.5.0...v2.6.0) (2019-02-25)


### Features

* **value:** add `synced` decorator ([791e884](https://github.com/davidbonnet/realue/commit/791e884))



<a name="2.5.0"></a>
# [2.5.0](https://github.com/davidbonnet/realue/compare/v2.4.0...v2.5.0) (2019-02-25)


### Features

* **queries:** add json response handler ([819e164](https://github.com/davidbonnet/realue/commit/819e164))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/davidbonnet/realue/compare/v2.3.1...v2.4.0) (2019-02-25)


### Bug Fixes

* use `getGlobal` to allow universal render ([2205ffe](https://github.com/davidbonnet/realue/commit/2205ffe))


### Features

* add `defaultProp` and `initialProp` ([3810f75](https://github.com/davidbonnet/realue/commit/3810f75))
* add `suspendedProp` and `suspendable` ([3ff659b](https://github.com/davidbonnet/realue/commit/3ff659b))



<a name="2.3.1"></a>
## [2.3.1](https://github.com/davidbonnet/realue/compare/v2.3.0...v2.3.1) (2019-02-22)


### Bug Fixes

* **properties:** correctly init state ([2b39d43](https://github.com/davidbonnet/realue/commit/2b39d43))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/davidbonnet/realue/compare/v2.2.0...v2.3.0) (2019-02-20)


### Features

* **properties:** add mode to `delayedProp` ([76bd62d](https://github.com/davidbonnet/realue/commit/76bd62d))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/davidbonnet/realue/compare/v2.1.1...v2.2.0) (2019-02-19)


### Features

* **properties:** add `callOnUnmount` option ([784384c](https://github.com/davidbonnet/realue/commit/784384c))
* **properties:** add `sideEffect` decorator ([2731e28](https://github.com/davidbonnet/realue/commit/2731e28))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/davidbonnet/realue/compare/v2.1.0...v2.1.1) (2019-02-18)


### Bug Fixes

* **children:** always set children on initial call ([b2f8e77](https://github.com/davidbonnet/realue/commit/b2f8e77))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/davidbonnet/realue/compare/v2.0.5...v2.1.0) (2019-02-17)


### Features

* **children:** add `withArrayChildren` and `withObjectChildren` ([3f52e03](https://github.com/davidbonnet/realue/commit/3f52e03))
* **properties:** add `makeShouldHandle` ([5279378](https://github.com/davidbonnet/realue/commit/5279378))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/davidbonnet/realue/compare/v2.0.4...v2.0.5) (2019-02-14)


### Bug Fixes

* **syncedProp:** use correctly named `onPull` ([3f0e39d](https://github.com/davidbonnet/realue/commit/3f0e39d))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/davidbonnet/realue/compare/v2.0.3...v2.0.4) (2019-02-10)


### Bug Fixes

* move koa-bodyparser to devDependency ([52aa67a](https://github.com/davidbonnet/realue/commit/52aa67a))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/davidbonnet/realue/compare/v2.0.2...v2.0.3) (2019-02-10)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/davidbonnet/realue/compare/v2.0.1...v2.0.2) (2019-02-10)


### Bug Fixes

* revert `withChild` changes ([de7c91b](https://github.com/davidbonnet/realue/commit/de7c91b))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/davidbonnet/realue/compare/v2.0.0...v2.0.1) (2019-02-10)


### Bug Fixes

* appropriately wrap component name ([5b0c6b8](https://github.com/davidbonnet/realue/commit/5b0c6b8))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/davidbonnet/realue/compare/v1.10.0...v2.0.0) (2019-02-06)


### Bug Fixes

* **tools:** add synced and editable names ([ddf43ac](https://github.com/davidbonnet/realue/commit/ddf43ac))
* do not use lazyProperty on necessary methods ([a82ae5a](https://github.com/davidbonnet/realue/commit/a82ae5a))
* **tools:** better handle `null` propNames ([e603d23](https://github.com/davidbonnet/realue/commit/e603d23))
* set esm setup back to auto ([cb551ee](https://github.com/davidbonnet/realue/commit/cb551ee))


### Features

* **dom:** add `domProps` decorator ([2bc741f](https://github.com/davidbonnet/realue/commit/2bc741f))
* **resources:** prepare playground ([9efa347](https://github.com/davidbonnet/realue/commit/9efa347))
* **tools:** add `refreshed` decorator ([dae213d](https://github.com/davidbonnet/realue/commit/dae213d))
* **tools:** add `resilientProp` decorator ([489abc8](https://github.com/davidbonnet/realue/commit/489abc8))
* **tools:** add promisedProp and promised ([b7bf152](https://github.com/davidbonnet/realue/commit/b7bf152))
* add support for queries ([4e61201](https://github.com/davidbonnet/realue/commit/4e61201))


### BREAKING CHANGES

* **tools:** `promisedProp` and `promised` do not keep the last
resolved value on promise update. Use `resilientProp` and `resilient`
to enable this feature.



<a name="1.10.0"></a>
# [1.10.0](https://github.com/davidbonnet/realue/compare/v1.9.0...v1.10.0) (2019-01-28)


### Bug Fixes

* **values:** name filterable HOC ([cdd38a5](https://github.com/davidbonnet/realue/commit/cdd38a5))


### Features

* **values:** add previous values to transformable ([0cb0ae9](https://github.com/davidbonnet/realue/commit/0cb0ae9))



<a name="1.9.0"></a>
# [1.9.0](https://github.com/davidbonnet/realue/compare/v1.8.0...v1.9.0) (2019-01-24)


### Features

* **tools:** update withChild with Component map support ([8cfb547](https://github.com/davidbonnet/realue/commit/8cfb547))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/davidbonnet/realue/compare/v1.7.0...v1.8.0) (2019-01-23)


### Bug Fixes

* **tools:** add synced and editable names ([4e4f237](https://github.com/davidbonnet/realue/commit/4e4f237))


### Features

* **tools:** add promisedProp and promised ([eb382a4](https://github.com/davidbonnet/realue/commit/eb382a4))



<a name="1.7.0"></a>
# [1.7.0](https://github.com/davidbonnet/realue/compare/v1.6.2...v1.7.0) (2019-01-23)


### Features

* **logProps:** display all props by default ([#31](https://github.com/davidbonnet/realue/issues/31)) ([fbfa30b](https://github.com/davidbonnet/realue/commit/fbfa30b))



<a name="1.6.2"></a>
## [1.6.2](https://github.com/davidbonnet/realue/compare/v1.6.1...v1.6.2) (2019-01-20)


### Bug Fixes

* **setup:** remove unused direct dependency ([b8d6040](https://github.com/davidbonnet/realue/commit/b8d6040))



<a name="1.6.1"></a>
## [1.6.1](https://github.com/davidbonnet/realue/compare/v1.6.0...v1.6.1) (2019-01-20)


### Bug Fixes

* **setup:** move react-dom to dev dependency ([d5205ce](https://github.com/davidbonnet/realue/commit/d5205ce))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/davidbonnet/realue/compare/v1.5.0...v1.6.0) (2019-01-17)


### Features

* **array:** add onAddItems method ([4e479ec](https://github.com/davidbonnet/realue/commit/4e479ec))



<a name="1.5.0"></a>
# [1.5.0](https://github.com/davidbonnet/realue/compare/v1.4.0...v1.5.0) (2019-01-17)


### Features

* **child:** add `destination` parameter ([999e70d](https://github.com/davidbonnet/realue/commit/999e70d))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/davidbonnet/realue/compare/v1.3.2...v1.4.0) (2019-01-17)


### Features

* **children:** add children constructors ([33c269d](https://github.com/davidbonnet/realue/commit/33c269d))



<a name="1.3.2"></a>
## [1.3.2](https://github.com/davidbonnet/realue/compare/v1.3.1...v1.3.2) (2019-01-13)


### Bug Fixes

* **defaultValue:** correclty consider nil values ([4a7b9e1](https://github.com/davidbonnet/realue/commit/4a7b9e1))
* **setup:** correctly watch and launch server ([1010c06](https://github.com/davidbonnet/realue/commit/1010c06))



<a name="1.3.1"></a>
## [1.3.1](https://github.com/davidbonnet/realue/compare/v1.3.0...v1.3.1) (2019-01-12)


### Bug Fixes

* **setup:** update output dist folder ([ea62c12](https://github.com/davidbonnet/realue/commit/ea62c12))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/davidbonnet/realue/compare/v1.2.0...v1.3.0) (2019-01-12)


### Bug Fixes

* **object:** set onChange accordingly ([280edd6](https://github.com/davidbonnet/realue/commit/280edd6))


### Features

* **array:** flatten decorator ([abcf8b4](https://github.com/davidbonnet/realue/commit/abcf8b4))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/davidbonnet/realue/compare/v1.1.4...v1.2.0) (2019-01-12)


### Features

* expose lazyProperty ([3391804](https://github.com/davidbonnet/realue/commit/3391804))



<a name="1.1.4"></a>
## [1.1.4](https://github.com/davidbonnet/realue/compare/v1.1.3...v1.1.4) (2019-01-12)


### Bug Fixes

* **insertItem:** prevent adding undefined values ([29f65b1](https://github.com/davidbonnet/realue/commit/29f65b1))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/davidbonnet/realue/compare/v1.1.2...v1.1.3) (2019-01-12)


### Bug Fixes

* **setup:** remove comments from dist files ([c9ffca1](https://github.com/davidbonnet/realue/commit/c9ffca1))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/davidbonnet/realue/compare/v1.1.1...v1.1.2) (2019-01-12)


### Bug Fixes

* **defaultValue:** stabilize virtual DOM ([3c6f407](https://github.com/davidbonnet/realue/commit/3c6f407))
* **demo:** correctly reset item creation form ([8a58202](https://github.com/davidbonnet/realue/commit/8a58202))
* **export:** provide module builds with sourcemaps ([f7c8389](https://github.com/davidbonnet/realue/commit/f7c8389))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/davidbonnet/realue/compare/v1.1.0...v1.1.1) (2019-01-09)


### Bug Fixes

* **dependency:** add lodash as dependency ([9f91109](https://github.com/davidbonnet/realue/commit/9f91109))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/davidbonnet/realue/compare/v1.0.0...v1.1.0) (2019-01-08)


### Features

* **object:** flatten `object` decorator ([6bd1f2d](https://github.com/davidbonnet/realue/commit/6bd1f2d))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/davidbonnet/realue/compare/v0.10.5...v1.0.0) (2019-01-08)


### Bug Fixes

* **array:** rename item push method ([fbe0274](https://github.com/davidbonnet/realue/commit/fbe0274))


### BREAKING CHANGES

* **array:** `onAdd` has been renamed to `onAddItem`.



<a name="0.10.5"></a>
## [0.10.5](https://github.com/davidbonnet/realue/compare/v0.10.4...v0.10.5) (2019-01-08)


### Bug Fixes

* **setup:** discard app example ([b2359b5](https://github.com/davidbonnet/realue/commit/b2359b5))



<a name="0.10.4"></a>
## [0.10.4](https://github.com/davidbonnet/realue/compare/v0.10.3...v0.10.4) (2019-01-08)


### Bug Fixes

* **setup:** remove dist folder ([7c7f498](https://github.com/davidbonnet/realue/commit/7c7f498))



<a name="0.10.3"></a>
## [0.10.3](https://github.com/davidbonnet/realue/compare/v0.10.2...v0.10.3) (2019-01-08)


### Bug Fixes

* **setup:** remove .cache folder ([a973084](https://github.com/davidbonnet/realue/commit/a973084))



<a name="0.10.2"></a>
## [0.10.2](https://github.com/davidbonnet/realue/compare/v0.10.1...v0.10.2) (2019-01-08)


### Bug Fixes

* **setup:** lower environment setup ([2770341](https://github.com/davidbonnet/realue/commit/2770341))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/davidbonnet/realue/compare/v0.10.0...v0.10.1) (2019-01-08)


### Bug Fixes

* **setup:** remove "module" field ([8c10f77](https://github.com/davidbonnet/realue/commit/8c10f77))



<a name="0.10.0"></a>
# [0.10.0](https://github.com/davidbonnet/realue/compare/v0.9.2...v0.10.0) (2019-01-08)


### Features

* **values:** add `fromValue` decorator ([d9b37d7](https://github.com/davidbonnet/realue/commit/d9b37d7)), closes [#23](https://github.com/davidbonnet/realue/issues/23)



<a name="0.9.2"></a>
## [0.9.2](https://github.com/davidbonnet/realue/compare/v0.9.1...v0.9.2) (2019-01-08)


### Bug Fixes

* **setup:** update lib building setup ([184d88c](https://github.com/davidbonnet/realue/commit/184d88c))



<a name="0.9.1"></a>
## [0.9.1](https://github.com/davidbonnet/realue/compare/v0.9.0...v0.9.1) (2018-05-10)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/davidbonnet/realue/compare/v0.8.0...v0.9.0) (2018-05-10)


### Bug Fixes

* **app:** Use `onRemove` instead of `remove` ([cb84165](https://github.com/davidbonnet/realue/commit/cb84165))
* **booleans:** Remove redundant `toggle()` ([e400d07](https://github.com/davidbonnet/realue/commit/e400d07))
* **dependencies:** Update dependencies ([524a13d](https://github.com/davidbonnet/realue/commit/524a13d))
* **dom:** Handle `fromEvent()` ([aa27451](https://github.com/davidbonnet/realue/commit/aa27451))
* **tests:** Update tests ([d2074a1](https://github.com/davidbonnet/realue/commit/d2074a1))


### Features

* BREAKING CHANGES: Modularize and simplify ([33a8688](https://github.com/davidbonnet/realue/commit/33a8688))
* **dates:** Add `date` ([8bd488c](https://github.com/davidbonnet/realue/commit/8bd488c))
* **numbers:** Add `parseNumber` ([f05b601](https://github.com/davidbonnet/realue/commit/f05b601))
* **objects:** Add `splittable` decorator ([e8ac760](https://github.com/davidbonnet/realue/commit/e8ac760))
* **values:** Rename `delayed` to `delayable` ([49ffb82](https://github.com/davidbonnet/realue/commit/49ffb82))



<a name="0.8.0"></a>
# [0.8.0](https://github.com/davidbonnet/realue/compare/v0.7.0...v0.8.0) (2018-03-15)


### Bug Fixes

* **number:** Detect invalid number and propagate it ([f2c8b62](https://github.com/davidbonnet/realue/commit/f2c8b62))
* **string:** Add default value to string ([f266d09](https://github.com/davidbonnet/realue/commit/f266d09))


### Features

* **onPropsChange:** Add current props to handler ([febe354](https://github.com/davidbonnet/realue/commit/febe354))
* **value:** BREAKING CHANGE: Rename `flush` to `push` ([6297636](https://github.com/davidbonnet/realue/commit/6297636))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/davidbonnet/realue/compare/v0.6.1...v0.7.0) (2018-03-08)


### Bug Fixes

* **object:** Set key to name if not set ([3540e56](https://github.com/davidbonnet/realue/commit/3540e56))


### Features

* **value:** Add `transformed` decorator ([ca19027](https://github.com/davidbonnet/realue/commit/ca19027))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/davidbonnet/realue/compare/v0.6.0...v0.6.1) (2018-03-05)



<a name="0.6.0"></a>
# [0.6.0](https://github.com/davidbonnet/realue/compare/v0.5.0...v0.6.0) (2018-03-05)


### Features

* Add defaults to array and object decorators ([b9ce533](https://github.com/davidbonnet/realue/commit/b9ce533))
