/* @flow */
import type {WebDriver} from 'selenium-adapter/src/webdriver/WebDriver'

export default function (adapter: WebDriver): Promise<void> {
  return adapter.quit()
}
