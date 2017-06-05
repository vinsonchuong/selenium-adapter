/* @flow */
import type {WebDriver} from 'selenium-adapter/src/webdriver/WebDriver'
import type {WebDriverElement} from 'selenium-adapter/src/webdriver/WebDriverElement'
import {By} from 'selenium-webdriver'
import cssToXPath from 'css-to-xpath'

export default async function (
  adapter: WebDriver,
  selector: string,
  text: ?string
): Promise<?WebDriverElement> {
  const xpath = typeof text === 'string'
    ? cssToXPath
      .parse(selector)
      .where(cssToXPath.xPathBuilder.text().contains(text))
      .toXPath()
    : cssToXPath(selector)
  const elements = await adapter.findElements(By.xpath(xpath))
  return elements[0]
}
