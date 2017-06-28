/* @flow */
import test from 'ava'
import { makeHeadlessChromeAdapter, close, navigate } from 'selenium-adapter'

test.beforeEach(async t => {
  t.context.chrome = makeHeadlessChromeAdapter()
})

test.afterEach.always(async t => {
  await close(t.context.chrome)
})

test('raising an error on 404', async t => {
  const { chrome } = t.context
  await t.throws(navigate(chrome, 'http://httpstat.us/404'), 'Not Found')
  await t.throws(
    navigate(chrome, 'http://httpstat.us/500'),
    'Internal Server Error'
  )
  await t.throws(
    navigate(chrome, 'http://127.0.0.2'),
    'net::ERR_CONNECTION_REFUSED'
  )
})
