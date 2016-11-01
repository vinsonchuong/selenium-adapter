import webdriver, {Builder, By, until} from 'selenium-webdriver';

class Element {
  constructor(element) {
    this.element = element;
  }

  async click() {
    await this.element.click();
  }

  async fillIn(text) {
    await this.element.sendKeys(text);
  }
}

export default class {
  constructor(browserName = 'chrome') {
    this.browser = new Builder().forBrowser(browserName).build(); 
  }

  async exit() {
    await this.browser.quit();
  }

  async open(url) {
    await this.browser.get(url);
  }

  async find(selector) {
    const element = await this.browser.findElement(By.css(selector));
    return new Element(element);
  }
}
