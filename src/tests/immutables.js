import test from 'ava'

import {
  insertItem,
  insertItems,
  setItem,
  replaceItem,
  setProperty,
  setProperties,
  same,
  different,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
} from '../immutables'

function similar(assert, base, value, expected, message) {
  assert.deepEqual(value, expected, message)
  assert.not(value, base, 'does not mutate')
}

test('insertItem', (assert) => {
  assert.is(typeof insertItem, 'function')
  const base = [0, 1, 2]
  assert.is(insertItem(), EMPTY_ARRAY, 'returns empty array with no arguments')
  assert.is(insertItem(base), base, 'returns array with no extra arguments')
  similar(
    assert,
    base,
    insertItem(base, 3, 0),
    [3, 0, 1, 2],
    'insertItems at head',
  )
  similar(
    assert,
    base,
    insertItem(base, 3, 1),
    [0, 3, 1, 2],
    'insertItems inside',
  )
  similar(
    assert,
    base,
    insertItem(base, 3, 5),
    [0, 1, 2, 3],
    'appends if out of bounds',
  )
  similar(assert, base, insertItem(base, 3), [0, 1, 2, 3], 'appends by default')
  similar(assert, null, insertItem(null, 3, 0), [3], 'creates array with value')
  similar(assert, null, insertItem(null, 3), [3], 'creates array with value')
})

test('insertItems', (assert) => {
  assert.is(typeof insertItems, 'function')
  const base = [0, 1, 2]
  assert.is(insertItems(), EMPTY_ARRAY, 'return empty array if no arguments')
  assert.is(insertItems(null, base), base, 'return same values if no array')
  assert.is(insertItems(base), base, 'return same array if no values')
  similar(
    assert,
    base,
    insertItems(base, [3, 4]),
    [0, 1, 2, 3, 4],
    'inserts items at tail',
  )
})

test('replaceItem', (assert) => {
  assert.is(typeof replaceItem, 'function')
  const base = [0, 1, 2]
  similar(
    assert,
    base,
    replaceItem(base, 1, 3),
    [0, 3, 2],
    'replace item inside',
  )
})

test('setItem', (assert) => {
  assert.is(typeof setItem, 'function')
  const base = [0, 1, 2]
  assert.is(setItem(null, 0), EMPTY_ARRAY, 'returns empty array if no value')
  assert.is(
    setItem(base, 3, undefined),
    base,
    'returns same array if index to remove is out of bounds',
  )
  assert.is(
    setItem(base, 2, 2),
    base,
    'returns same array if same value at index',
  )
  similar(
    assert,
    base,
    setItem(base, 0, 3),
    [3, 1, 2],
    'replaces items at head',
  )
  similar(assert, base, setItem(base, 1, 3), [0, 3, 2], 'replaces items inside')
  similar(
    assert,
    base,
    setItem(base, 2, 3),
    [0, 1, 3],
    'replaces items at tail',
  )
  similar(
    assert,
    base,
    setItem(base, 5, 3),
    [0, 1, 2, 3],
    'appends if out of bounds',
  )
  similar(assert, null, setItem(null, 0, 3), [3], 'creates array')
  assert.is(setItem(null, -1, 3), EMPTY_ARRAY, 'creates empty array')
  assert.is(setItem(base, -1, 3), base, 'returns same array if not found')
  assert.is(setItem(base, null, 3), base, 'returns same array if no index')
  assert.is(setItem(), EMPTY_ARRAY, 'returns empty array if no arguments')
  similar(assert, base, setItem(base, 0), [1, 2], 'removes item if undefined')
})

test('setProperty', (assert) => {
  assert.is(typeof setProperty, 'function')
  const base = { a: 1 }
  assert.is(base, setProperty(base), 'returns same object if no key provided')
  similar(
    assert,
    base,
    setProperty(base, 'a', 2),
    { a: 2 },
    'replaces existing key',
  )
  similar(
    assert,
    base,
    setProperty(base, 'b', 2),
    { a: 1, b: 2 },
    'adds new key',
  )
  similar(assert, base, setProperty(base, 'a'), EMPTY_OBJECT, 'removes key')
  similar(
    assert,
    null,
    setProperty(null, 'a', 1),
    { a: 1 },
    'creates object with key',
  )
  similar(
    assert,
    null,
    setProperty(null, 'a'),
    EMPTY_OBJECT,
    'creates empty object',
  )
  similar(
    assert,
    null,
    setProperty(),
    EMPTY_OBJECT,
    'creates empty object if no arguments',
  )
  assert.is(setProperty(base, 'a', 1), base, 'returns same object if no change')
  assert.is(
    setProperty(base, 'b'),
    base,
    'returns same object if key to remove is non-existent',
  )
})

test('setProperties', (assert) => {
  assert.is(typeof setProperties, 'function')
  const base = { a: 1 }
  assert.is(setProperties(base), base, 'returns same object if values are nil')
  similar(
    assert,
    base,
    setProperties(base, { a: 2 }),
    { a: 2 },
    'replaces existing key',
  )
  similar(
    assert,
    base,
    setProperties(base, { b: 2 }),
    { a: 1, b: 2 },
    'adds new key',
  )
  similar(
    assert,
    base,
    setProperties(base, { a: undefined }),
    EMPTY_OBJECT,
    'removes key',
  )
  similar(
    assert,
    null,
    setProperties(null, { a: 1 }),
    { a: 1 },
    'creates object with key',
  )
  similar(
    assert,
    null,
    setProperties(null, { a: undefined }),
    EMPTY_OBJECT,
    'creates empty object',
  )
  similar(
    assert,
    null,
    setProperties(),
    EMPTY_OBJECT,
    'creates empty object if no arguments',
  )
  assert.is(
    setProperties(base, { a: 1 }),
    base,
    'returns same object if no change',
  )
  assert.is(
    setProperties(base, { b: undefined }),
    base,
    'returns same object if key to remove is non-existent',
  )
})

test('same', (assert) => {
  assert.is(typeof same, 'function')
  const a = { a: 1, b: 2 }
  const b = { a: 1, b: 1 }
  assert.true(same(a, a), 'same object')
  assert.true(same(a, { a: 1, b: 2 }), 'similar object')
  assert.false(same(a, b), 'different object')
  assert.true(same({ a }, { a }, ['a.b'], true), 'deeply similar object')
  assert.false(
    same({ a }, { a: { b: 1 } }, ['a.b'], true),
    'deeply dissimilar object',
  )
})

test('different', (assert) => {
  assert.is(typeof different, 'function')
  assert.is(typeof different(['a.b']), 'function')
  const a = { a: 1, b: 2 }
  const b = { a: 1, b: 1 }
  assert.true(different(['a.b'])({ a }, { a: b }), 'deeply different')
  assert.false(different(['a.a'])({ a }, { a: b }), 'are not deeply different')
  assert.true(different(['b'], false)(a, b), 'different')
  assert.false(different(['a'], false)(a, b), 'not different')
})
