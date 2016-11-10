import {Builder, By, until} from 'selenium-webdriver';
import cssToXPath from 'css-to-xpath';

class Element {
  constructor(element, metadata) {
    this.element = element;
    Object.assign(this, metadata);
  }

  async click() {
    await this.element.click();
  }

  async fillIn(text) {
    await this.element.click();
    await this.element.sendKeys(text);
  }
}

export default class {
  constructor(browserName) {
    this.browser = new Builder().forBrowser(browserName).build(); 
  }

  async exit() {
    await this.browser.quit();
  }

  async evaluate(functionBody) {
    return await this.browser.executeScript(functionBody);
  }

  async open(url) {
    await this.browser.get(url);
  }

  async find(selector, {text, wait = 1} = {}) {
    const xpath = typeof text === 'string' ?
      cssToXPath
        .parse(selector)
        .where(cssToXPath.xPathBuilder.text().contains(text))
        .toXPath() :
      cssToXPath(selector);

    const element = await this.browser.wait(
      until.elementLocated(By.xpath(xpath)),
      wait
    );

    return new Element(element, {
      textContent: await element.getText(),
      value: await element.getAttribute('value')
    });
  }
}
