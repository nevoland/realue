import test from 'ava'
import render from 'react-test-renderer'
import { compose } from 'recompose'

import { $ } from '../tools'
import { sleep, promisedProp } from '../promises'

class CustomError extends Error {}

const Promised = compose(
  promisedProp({
    name: 'value',
    handleError(error) {
      return error instanceof CustomError
    },
  }),
)(({ value = 'Empty' }) => $('pre', JSON.stringify(value, null, 2)))

test('sleep', async (assert) => {
  const time = Date.now()
  const duration = 1000
  await sleep(duration)
  assert.true(Date.now() - time >= duration, 'waits for given duration')
})

test('decorates component', async (assert) => {
  assert.snapshot(
    render.create($(Promised, { value: 'Non-promised value' })).toJSON(),
  )
  const promise = sleep(1000).then(() => 'Promised value')
  const rendering = render.create($(Promised, { value: promise }))
  assert.snapshot(rendering.toJSON(), 'first render')
  await promise
  assert.snapshot(rendering.toJSON(), 'resolved render')
})

test('handles specific errors', async (assert) => {
  await assert.throwsAsync(
    async () => {
      const promise = (async () => {
        throw new CustomError('Unhandled error')
      })()
      const rendering = render.create(
        $(Promised, {
          value: promise,
        }),
      )
      await promise
      rendering.toJSON()
    },
    undefined,
    'handles specific error',
  )
})
