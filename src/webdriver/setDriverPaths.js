/* @flow */
import * as path from 'path'
import {path as phantomJSPath} from 'phantomjs-prebuilt'

let pathsSet = false
export default function (): void {
  if (pathsSet) {
    return
  }
  pathsSet = true

  if (typeof process.env.PATH === 'string') {
    require('chromedriver')
    require('geckodriver')
    process.env.PATH += `${path.delimiter}${path.dirname(phantomJSPath)}`
  }
}
