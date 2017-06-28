/* @flow */
import * as path from 'path'

export default function(): Array<string> {
  if (typeof process.env.PATH !== 'string') {
    return []
  }

  if (process.env.PATH === '') {
    return []
  }

  return process.env.PATH.split(path.delimiter)
}
