/* @flow */
import type { WebDriver } from 'selenium-adapter/src/webdriver'

export default function<T>(adapter: WebDriver, fn: () => T): Promise<T> {
  return adapter.executeScript(fn)
}
