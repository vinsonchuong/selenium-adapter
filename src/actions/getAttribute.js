/* @flow */
import type { WebDriverElement } from 'selenium-adapter/src/webdriver'

export default async function(
  element: ?WebDriverElement,
  attributeName: string
): Promise<?string> {
  return element && element.getAttribute(attributeName)
}
