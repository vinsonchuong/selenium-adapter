/* @flow */
import {Builder} from 'selenium-webdriver'
import {Options as ChromeOptions} from 'selenium-webdriver/chrome'
import setDriverPaths from './setDriverPaths'
import type {WebDriver} from './WebDriver'

export type WebDriverBrowserName = 'chrome' | 'firefox' | 'phantomjs'
export type Options = {[string]: string | boolean}

export default function (
  name: WebDriverBrowserName,
  options: Options = {}
): WebDriver {
  setDriverPaths()

  const builder = new Builder().forBrowser(name)

  if (name === 'chrome') {
    const chromeOptions = new ChromeOptions()
    for (const [key, value] of Object.entries(options)) {
      if (typeof value === 'string') {
        chromeOptions.addArguments(`${key}=${value}`)
      } else if (value) {
        chromeOptions.addArguments(key)
      }
    }
    builder.setChromeOptions(chromeOptions)
  }

  return builder.build()
}
