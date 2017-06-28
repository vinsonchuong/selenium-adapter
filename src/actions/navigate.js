/* @flow */
import type { WebDriver } from 'selenium-adapter/src/webdriver'
import { URL } from 'url'
import { getLogs } from 'selenium-adapter'

const errorTypes = ['CONNECTION_ERROR', 'HTTP_ERROR']

export default async function(adapter: WebDriver, url: string): Promise<void> {
  await adapter.get(url)

  const errorLogs = await getLogs(
    adapter,
    log => urlsEqual(url, log.url) && errorTypes.includes(log.type)
  )
  for (const { message } of errorLogs) {
    throw new Error(message)
  }
}

function urlsEqual(url1: string, url2: string): boolean {
  return new URL(url1).toString() === new URL(url2).toString()
}
