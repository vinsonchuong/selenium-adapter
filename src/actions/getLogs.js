/* @flow */
import { Type } from 'selenium-webdriver/lib/logging'
import type { WebDriver } from 'selenium-adapter/src/webdriver'
import type { Log } from 'selenium-adapter/src/logs'
import logParsers from 'selenium-adapter/src/logs'

export default async function(
  adapter: WebDriver,
  filter: Log => boolean = () => true
): Promise<Array<Log>> {
  const webDriverLogEntries = await adapter
    .manage()
    .logs()
    .get(Type.BROWSER)

  const logs = []
  for (const logEntry of webDriverLogEntries) {
    for (const parseLog of logParsers) {
      const log = parseLog(logEntry)
      if (log) {
        logs.push(log)
      }
    }
  }
  return logs
}
