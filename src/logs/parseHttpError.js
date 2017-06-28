/* @flow */
import type { WebDriverLogEntry } from 'selenium-adapter/src/webdriver'

export type Log = {
  type: 'HTTP_ERROR',
  url: string,
  statusCode: string,
  message: string
}

export default function(logEntry: WebDriverLogEntry): ?Log {
  const pattern = /^(.*?) - Failed to load resource: the server responded with a status of (\d+) \((.*?)\)$/
  const match = logEntry.message.match(pattern)
  return (
    match && {
      type: 'HTTP_ERROR',
      url: match[1],
      statusCode: match[2],
      message: match[3]
    }
  )
}
