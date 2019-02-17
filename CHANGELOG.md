# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
