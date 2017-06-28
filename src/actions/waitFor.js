/* @flow */

export default async function waitFor<T>(
  time: number,
  getResult: () => Promise<T>
): Promise<?T> {
  const result = await getResult()
  if (result) {
    return result
  }
  if (time <= 0) {
    return null
  }
  await sleep(100)
  return waitFor(time - 100, getResult)
}

function sleep(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
