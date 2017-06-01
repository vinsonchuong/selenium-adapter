/* @flow */
import type {WebDriver} from 'selenium-adapter/src/webdriver/WebDriver'
import type {WebDriverElement} from 'selenium-adapter/src/webdriver/WebDriverElement'
import {By} from 'selenium-webdriver'
import cssToXPath from 'css-to-xpath'

export function close (adapter: WebDriver): Promise<void> {
  return adapter.quit()
}

export function navigate (adapter: WebDriver, url: string): Promise<void> {
  return adapter.get(url)
}

export function evaluate<T> (adapter: WebDriver, fn: () => T): Promise<T> {
  return adapter.executeScript(fn)
}

export async function findElement (
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

export async function getText (element: ?WebDriverElement): Promise<?string> {
  return element && element.getText()
}

export async function click (element: ?WebDriverElement): Promise<void> {
  if (element) {
    await element.click()
  }
}

export async function fillIn (
  element: ?WebDriverElement,
  value: string
): Promise<void> {
  if (element) {
    await element.clear()
    await element.sendKeys(value)
  }
}

export async function waitFor<T> (
  time: number,
  getResult: () => Promise<T>
): Promise<?T> {
  const result = await getResult()
  if (result) {
    return result
  }
  if (time <= 0) {
    return null
  }
  await sleep(100)
  return waitFor(time - 100, getResult)
}

function sleep (time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
