/* @flow */
import type { WebDriverElement, WebDriverLogEntry } from './'

export interface WebDriver {
  executeAsyncScript<T>(script: ((T) => void) => void): Promise<T>;
  executeScript<T>(script: () => T): Promise<T>;
  findElement(locator: string): Promise<WebDriverElement>;
  findElements(locator: string): Promise<Array<WebDriverElement>>;
  get(url: string): Promise<void>;
  manage(): {
    logs(): {
      get(type: string): Promise<Array<WebDriverLogEntry>>
    }
  };
  quit(): Promise<void>;
  takeScreenshot(): Promise<string>;
  wait<T>(condition: () => Promise<?T>): T;
}
