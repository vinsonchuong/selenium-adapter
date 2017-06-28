/* @flow */
import type { WebDriver } from './webdriver/WebDriver'
import makeWebDriver from './webdriver/makeWebDriver'

export function makeChromeAdapter(): WebDriver {
  return makeWebDriver('chrome', {})
}

export function makeHeadlessChromeAdapter(): WebDriver {
  return makeWebDriver('chrome', { headless: true })
}

export function makeFirefoxAdapter(): WebDriver {
  return makeWebDriver('firefox', {})
}

export function makePhantomAdapter(): WebDriver {
  return makeWebDriver('phantomjs', {})
}
