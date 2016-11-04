import webdriver, {Builder, By, until} from 'selenium-webdriver';

class Element {
  constructor(element, metadata) {
    this.element = element;
    Object.assign(this, metadata);
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

  async find(selector) {
    const element = await this.browser.findElement(By.css(selector));
    return new Element(element, {
      textContent: await element.getText()
    });
  }
}
