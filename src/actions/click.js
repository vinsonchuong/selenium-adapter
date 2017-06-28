/* @flow */
import type { WebDriverElement } from 'selenium-adapter/src/webdriver'

export default async function(element: ?WebDriverElement): Promise<void> {
  if (element) {
    await element.click()
  }
}
