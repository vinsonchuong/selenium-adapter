/* @flow */
import test from 'ava'
import once from 'selenium-adapter/src/fntools/once'

test('executing the decorated function once', t => {
  let callCount = 0
  function fn() {
    callCount += 1
    return 'result'
  }
  const onceFn = once(fn)
  t.is(onceFn(), 'result')
  t.is(onceFn(), 'result')
  t.is(callCount, 1)
})
