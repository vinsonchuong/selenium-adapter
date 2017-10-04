/* @flow */
import { Type } from 'selenium-webdriver/lib/logging'
import type {
  WebDriver,
  WebDriverLogEntry
} from 'selenium-adapter/src/webdriver'
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
  return webDriverLogEntries
    .map(logEntry => parseLogEntry(logEntry))
    .filter(Boolean)
    .filter(filter)
}

function parseLogEntry(logEntry: WebDriverLogEntry): ?Log {
  for (const parseLog of logParsers) {
    const log = parseLog(logEntry)
    if (log) {
      return log
    }
  }
}
