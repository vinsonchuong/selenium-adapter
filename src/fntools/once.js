/* @flow */
/* eslint-disable no-redeclare */

declare function once<T>(fn: T): T
export default function once(fn) {
  let called = false
  let result
  return function() {
    if (!called) {
      called = true
      result = fn()
    }
    return result
  }
}
