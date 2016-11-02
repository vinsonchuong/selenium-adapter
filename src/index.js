import webdriver, {Builder, By, until} from 'selenium-webdriver';

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
}
