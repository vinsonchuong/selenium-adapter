/* @flow */
import type {WebDriverElement} from './WebDriverElement'

export interface WebDriver {
  executeAsyncScript<T>(script: ((T) => void) => void): Promise<T>,
  executeScript<T>(script: () => T): Promise<T>,
  findElement(locator: string): Promise<WebDriverElement>,
  findElements(locator: string): Promise<Array<WebDriverElement>>,
  get(url: string): Promise<void>,
  quit(): Promise<void>,
  takeScreenshot(): Promise<string>,
  wait<T>(condition: () => Promise<?T>): T
}
