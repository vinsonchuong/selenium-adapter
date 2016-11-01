import webdriver, {Builder} from 'selenium-webdriver';

export default class {
  constructor(browserName) {
    this.browser = new Builder().forBrowser(browserName).build(); 
  }

  async evaluate(functionBody) {
    return await this.browser.executeScript(functionBody);
  }

  async exit() {
    await this.browser.quit();
  }
}
