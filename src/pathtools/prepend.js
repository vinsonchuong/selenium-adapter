/* @flow */
import getEntries from './getEntries'
import setEntries from './setEntries'

export default function(newEntry: string): void {
  const currentEntries = getEntries()
  if (!currentEntries.includes(newEntry)) {
    setEntries([newEntry].concat(currentEntries))
  }
}
