import {Builder, By, Key, until} from 'selenium-webdriver'
import {Options as ChromeDriverOptions} from 'selenium-webdriver/chrome'
import cssToXPath from 'css-to-xpath'

function times (number, string) {
  return new Array(number).fill(string)
}

class Element {
  constructor (element, metadata) {
    this.element = element
    Object.assign(this, metadata)
  }

  async click () {
    await this.element.click()
  }

  async fillIn (text) {
    await this.element.sendKeys(
      ...times(this.value.length, Key.BACK_SPACE),
      text
    )
  }
}

export default class {
  constructor (browserName) {
    if (browserName === 'headless-chrome') {
      const options = new ChromeDriverOptions()
        .addArguments('headless')
      this.browser = new Builder().forBrowser('chrome')
        .setChromeOptions(options)
        .build()
    } else {
      this.browser = new Builder().forBrowser(browserName)
        .build()
    }
  }

  async exit () {
    await this.browser.quit()
  }

  async evaluate (functionBody) {
    return this.browser.executeScript(functionBody)
  }

  async open (url) {
    await this.browser.get(url)
  }

  async find (selector, {text, wait = 1} = {}) {
    const xpath = typeof text === 'string'
      ? cssToXPath
        .parse(selector)
        .where(cssToXPath.xPathBuilder.text().contains(text))
        .toXPath()
      : cssToXPath(selector)

    const element = await this.browser.wait(
      until.elementLocated(By.xpath(xpath)),
      wait
    )

    return new Element(element, {
      textContent: await element.getText(),
      value: await element.getAttribute('value')
    })
  }
}
