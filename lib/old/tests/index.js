import test from 'ava'

export class ThrownValue extends Error {
  constructor(value) {
    super('Thrown value')
    this.value = value
  }
}

import '../'

test.todo('write tests')
