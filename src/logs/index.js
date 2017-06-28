/* @flow */
import type { Log as ConnectionErrorLog } from './parseConnectionError'
import type { Log as HttpErrorLog } from './parseHttpError'

import parseConnectionError from './parseConnectionError'
import parseHttpError from './parseHttpError'

export type Log = ConnectionErrorLog | HttpErrorLog

export default [parseConnectionError, parseHttpError]
