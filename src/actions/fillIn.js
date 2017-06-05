/* @flow */
import type {WebDriverElement} from 'selenium-adapter/src/webdriver/WebDriverElement'

export default async function (
  element: ?WebDriverElement,
  value: string
): Promise<void> {
  if (element) {
    await element.clear()
    await element.sendKeys(value)
  }
}
