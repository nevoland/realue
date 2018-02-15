import test from 'ava'

import { hasProp, insert, replaceAt, replace, set, isValidDate } from '../tools'

function similar(assert, base, value, expected, message) {
  assert.deepEqual(value, expected, message)
  assert.not(value, base, 'does not mutate')
}

test('hasOnChange', assert => {
  assert.is(typeof hasProp, 'function')
  assert.true(hasProp('onChange')({ onChange() {} }), 'detects set onChange')
  assert.false(hasProp('onChange')({}), 'detects missing onChange')
})

test('insert', assert => {
  assert.is(typeof insert, 'function')
  const base = [0, 1, 2]
  similar(assert, base, insert(base, 3, 0), [3, 0, 1, 2], 'inserts at head')
  similar(assert, base, insert(base, 3, 1), [0, 3, 1, 2], 'inserts inside')
  similar(
    assert,
    base,
    insert(base, 3, 5),
    [0, 1, 2, 3],
    'appends if out of bounds',
  )
  similar(assert, base, insert(base, 3), [0, 1, 2, 3], 'appends by default')
  similar(assert, null, insert(null, 3, 0), [3], 'creates array with value')
  similar(assert, null, insert(null, 3), [3], 'creates array with value')
})

test('replaceAt', assert => {
  assert.is(typeof replaceAt, 'function')
  const base = [0, 1, 2]
  similar(assert, base, replaceAt(base, 0, 3), [3, 1, 2], 'replaces at head')
  similar(assert, base, replaceAt(base, 1, 3), [0, 3, 2], 'replaces inside')
  similar(assert, base, replaceAt(base, 2, 3), [0, 1, 3], 'replaces at tail')
  similar(
    assert,
    base,
    replaceAt(base, 5, 3),
    [0, 1, 2, 3],
    'appends if out of bounds',
  )
  similar(assert, null, replaceAt(null, 0, 3), [3], 'creates array')
  similar(assert, null, replaceAt(null, -1, 3), [], 'creates empty array')
  assert.is(replaceAt(base, -1, 3), base, 'returns same array if not found')
})

test('replace', assert => {
  assert.is(typeof replace, 'function')
  const base = [0, 1, 2]
  similar(assert, base, replace(base, 0, 3), [3, 1, 2], 'replaces at head')
  similar(assert, base, replace(base, 1, 3), [0, 3, 2], 'replaces inside')
  similar(assert, base, replace(base, 2, 3), [0, 1, 3], 'replaces at tail')
  assert.is(replace(base, 5, 3), base, 'returns same array if not found')
  similar(assert, null, replace(null, 0, 3), [], 'creates empty array')
})

test('set', assert => {
  assert.is(typeof set, 'function')
  const base = { a: 1 }
  similar(assert, base, set(base, 'a', 2), { a: 2 }, 'replaces existing key')
  similar(assert, base, set(base, 'b', 2), { a: 1, b: 2 }, 'adds new key')
  similar(assert, base, set(base, 'a', undefined), {}, 'removes key')
  similar(assert, null, set(null, 'a', 1), { a: 1 }, 'creates object with key')
  similar(assert, null, set(null, 'a', undefined), {}, 'creates empty object')
  assert.is(set(base, 'a', 1), base, 'returns same object if no change')
})

test('isValidDate', assert => {
  assert.is(typeof isValidDate, 'function')
  assert.true(isValidDate(new Date()), 'detects valid date')
  assert.true(isValidDate(new Date('1984-01-01')), 'detects valid date')
  assert.false(isValidDate(new Date('')), 'detects invalid date')
  assert.false(isValidDate(new Date('wrong')), 'detects invalid date')
})
