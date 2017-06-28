/* @flow */
import * as path from 'path'

export default function(entries: Array<string>): void {
  process.env.PATH = entries.join(path.delimiter)
}
