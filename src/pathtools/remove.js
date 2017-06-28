/* @flow */
import getEntries from './getEntries'
import setEntries from './setEntries'

export default function(entry: string): void {
  const currentEntries = getEntries()
  const index = currentEntries.indexOf(entry)

  if (index === -1) {
    return
  }

  setEntries(
    currentEntries.slice(0, index).concat(currentEntries.slice(index + 1))
  )
}
