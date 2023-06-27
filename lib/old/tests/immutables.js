import test from 'ava'

import {
  insertItem,
  setItem,
  setProperty,
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

test('setItem', (assert) => {
  assert.is(typeof setItem, 'function')
  const base = [0, 1, 2]
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
  similar(assert, base, setProperty(base, 'a'), {}, 'removes key')
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
