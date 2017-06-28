/* @flow */
import test from 'ava'
import getEntries from 'selenium-adapter/src/pathtools/getEntries'
import restorePath from 'selenium-adapter/test/helpers/restorePath'

test(
  'reading and parsing PATH entries',
  restorePath(t => {
    process.env.PATH = '/usr/bin:/usr/local/bin:/foo/bar'
    t.deepEqual(getEntries(), ['/usr/bin', '/usr/local/bin', '/foo/bar'])
  })
)

test(
  'reading and parsing an empty PATH',
  restorePath(t => {
    process.env.PATH = ''
    t.deepEqual(getEntries(), [])
  })
)
