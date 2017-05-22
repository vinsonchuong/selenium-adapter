/* @flow */
import test from 'ava'
import * as path from 'path'
import remove from 'selenium-adapter/src/pathtools/remove'
import type {WebDriver} from 'selenium-adapter/src/webdriver/WebDriver'
import {
  makeChromeAdapter,
  makeHeadlessChromeAdapter,
  makeFirefoxAdapter,
  makePhantomAdapter
} from 'selenium-adapter/src/makeAdapater'

// Ensures that the following drivers are on the PATH
remove(path.resolve('node_modules', '.bin'))

test('opening Chrome via ChromeDriver', async (t) => {
  const driver = makeChromeAdapter()
  t.regex(await getUserAgent(driver), /Chrome/)
  await driver.quit()
})

test('opening Headless Chrome via ChromeDriver', async (t) => {
  const driver = makeHeadlessChromeAdapter()
  t.regex(await getUserAgent(driver), /HeadlessChrome/)
  await driver.quit()
})

test('opening Firefox via GeckoDriver', async (t) => {
  const driver = makeFirefoxAdapter()
  t.regex(await getUserAgent(driver), /Firefox/)
  await driver.quit()
})

test('opening PhantomJS', async (t) => {
  const driver = makePhantomAdapter()
  t.regex(await getUserAgent(driver), /PhantomJS/)
  await driver.quit()
})

function getUserAgent (driver: WebDriver): Promise<string> {
  return driver.executeScript(() => window.navigator.userAgent)
}
