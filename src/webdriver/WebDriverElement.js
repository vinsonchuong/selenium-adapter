/* @flow */

export interface WebDriverElement {
  clear(): Promise<void>;
  click(): Promise<void>;
  findElement(locator: string): Promise<WebDriverElement>;
  findElements(locator: string): Promise<Array<WebDriverElement>>;
  getAttribute(name: string): Promise<string>;
  getCssValue(name: string): Promise<string>;
  getText(): Promise<string>;
  isDisplayed(): Promise<boolean>;
  isSelected(): Promise<boolean>;
  sendKeys(...strings: Array<string>): Promise<boolean>;
  submit(): Promise<void>;
}
