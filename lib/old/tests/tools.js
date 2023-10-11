import test from "ava"

import { hasNotProp, hasProp, isValidDate } from "../tools"

test("hasProp", (assert) => {
  assert.is(typeof hasProp, "function")
  assert.is(typeof hasProp("onChange"), "function")
  assert.is(hasProp("onChange"), hasProp("onChange"), "memoizes")
  assert.true(hasProp("onChange")({ onChange() {} }), "detects set onChange")
  assert.false(hasProp("onChange")({}), "detects missing onChange")
})

test("hasNotProp", (assert) => {
  assert.is(typeof hasNotProp, "function")
  assert.is(typeof hasNotProp("onChange"), "function")
  assert.is(hasNotProp("onChange"), hasNotProp("onChange"), "memoizes")
  assert.false(
    hasNotProp("onChange")({ onChange() {} }),
    "detects set onChange",
  )
  assert.true(hasNotProp("onChange")({}), "detects missing onChange")
})

test("isValidDate", (assert) => {
  assert.is(typeof isValidDate, "function")
  assert.true(isValidDate(new Date()), "detects valid date")
  assert.true(isValidDate(new Date("1984-01-01")), "detects valid date")
  assert.false(isValidDate(new Date("")), "detects invalid date")
  assert.false(isValidDate(new Date("wrong")), "detects invalid date")
})
