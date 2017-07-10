/* @flow */
import type {
  WebDriver,
  WebDriverElement
} from 'selenium-adapter/src/webdriver'
import { By } from 'selenium-webdriver'
import cssToXPath from 'css-to-xpath'

export default async function(
  adapterOrElement: WebDriver | ?WebDriverElement,
  selector: string,
  text: ?string
): Promise<?WebDriverElement> {
  if (!adapterOrElement) {
    return null
  }

  const xpath =
    typeof text === 'string'
      ? cssToXPath
          .parse(selector)
          .where(cssToXPath.xPathBuilder.text().contains(text))
          .toXPath()
      : cssToXPath(selector)
  const elements = await adapterOrElement.findElements(By.xpath(xpath))
  return elements[0]
}
