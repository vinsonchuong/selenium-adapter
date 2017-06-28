/* @flow */
import test from 'ava'
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import prepend from 'selenium-adapter/src/pathtools/prepend'
import restorePath from 'selenium-adapter/test/helpers/restorePath'

test.serial(
  'prepending to the bin search path',
  restorePath(t => {
    prepend('/foo/bar')
    t.is(getEntries()[0], '/foo/bar')
  })
)

test.serial(
  'attempting to prepend an existing entry does nothing',
  restorePath(t => {
    const originalEntries = getEntries()
    prepend(originalEntries[0])
    t.deepEqual(getEntries(), originalEntries)
  })
)
