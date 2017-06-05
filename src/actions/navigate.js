/* @flow */
import type {WebDriver} from 'selenium-adapter/src/webdriver/WebDriver'

export default function (adapter: WebDriver, url: string): Promise<void> {
  return adapter.get(url)
}
