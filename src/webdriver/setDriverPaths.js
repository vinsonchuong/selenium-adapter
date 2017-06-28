/* @flow */
import * as path from 'path'
import { path as phantomPath } from 'phantomjs-prebuilt'
import once from 'selenium-adapter/src/fntools/once'
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import setEntries from 'selenium-adapter/src/pathtools/setEntries'
import prepend from 'selenium-adapter/src/pathtools/prepend'

export default once((): void => {
  const originalEntries = getEntries()
  const chromedriverPath = require('chromedriver').path
  const geckodriverPath = require('geckodriver').path
  setEntries(originalEntries)

  prepend(path.dirname(chromedriverPath))
  prepend(path.dirname(geckodriverPath))
  prepend(path.dirname(phantomPath))
})
