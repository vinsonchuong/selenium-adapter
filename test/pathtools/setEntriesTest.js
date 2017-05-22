/* @flow */
import test from 'ava'
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import setEntries from 'selenium-adapter/src/pathtools/setEntries'
import restorePath from 'selenium-adapter/test/helpers/restorePath'

test('reading and parsing PATH entries', restorePath((t) => {
  setEntries(['/usr/bin', '/usr/local/bin', '/foo/bar'])
  t.deepEqual(getEntries(), ['/usr/bin', '/usr/local/bin', '/foo/bar'])
}))
