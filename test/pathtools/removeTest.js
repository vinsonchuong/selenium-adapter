/* @flow */
import test from 'ava'
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import setEntries from 'selenium-adapter/src/pathtools/setEntries'
import remove from 'selenium-adapter/src/pathtools/remove'
import restorePath from 'selenium-adapter/test/helpers/restorePath'

test.serial('removing an entry from the bin search path', restorePath((t) => {
  setEntries(['/a/b', '/c/d', '/e/f'])

  remove('/not-in-there')
  t.deepEqual(getEntries(), ['/a/b', '/c/d', '/e/f'])

  remove('/c/d')
  t.deepEqual(getEntries(), ['/a/b', '/e/f'])

  remove('/e/f')
  t.deepEqual(getEntries(), ['/a/b'])

  remove('/a/b')
  t.deepEqual(getEntries(), [])

  remove('/a/b')
  t.deepEqual(getEntries(), [])
}))
