/* @flow */
/* eslint-disable no-redeclare */
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import setEntries from 'selenium-adapter/src/pathtools/setEntries'

declare function restorePath<T>(testCase: T): T
export default function restorePath(testCase) {
  return function(t) {
    const originalEntries = getEntries()
    try {
      testCase(t)
    } finally {
      setEntries(originalEntries)
    }
  }
}
