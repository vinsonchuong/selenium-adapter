/* @flow */
import type { WebDriverLogEntry } from 'selenium-adapter/src/webdriver'

export type Log = {
  type: 'CONNECTION_ERROR',
  url: string,
  message: string
}

export default function(logEntry: WebDriverLogEntry): ?Log {
  const pattern = /^(.*?) - Failed to load resource: (net::.*)$/
  const match = logEntry.message.match(pattern)
  return (
    match && {
      type: 'CONNECTION_ERROR',
      url: match[1],
      message: match[2]
    }
  )
}
