/* @flow */
import test from 'ava'
import TmpDirectory from 'selenium-adapter/test/helpers/TmpDirectory'
import { makeHeadlessChromeAdapter, close } from 'selenium-adapter'

export function injectAdapter(): void {
  test.beforeEach(t => {
    t.context.adapter = makeHeadlessChromeAdapter()
  })

  test.afterEach.always(async t => {
    await close(t.context.adapter)
  })
}

export function injectTmpDirectory(): void {
  test.beforeEach(t => {
    t.context.tmpDirectory = new TmpDirectory()
  })

  test.afterEach.always(async t => {
    await t.context.tmpDirectory.remove()
  })
}
