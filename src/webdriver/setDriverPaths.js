/* @flow */
import * as path from 'path'
import {path as chromedriverPath} from 'chromedriver'
import {path as geckodriverPath} from 'geckodriver'
import {path as phantomPath} from 'phantomjs-prebuilt'
import once from 'selenium-adapter/src/fntools/once'
import prepend from 'selenium-adapter/src/pathtools/prepend'

export default once((): void => {
  prepend(path.dirname(chromedriverPath))
  prepend(path.dirname(geckodriverPath))
  prepend(path.dirname(phantomPath))
})
