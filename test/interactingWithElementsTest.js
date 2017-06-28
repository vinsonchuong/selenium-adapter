/* @flow */
import test from 'ava'
import {
  injectAdapter,
  injectTmpDirectory
} from 'selenium-adapter/test/helpers/inject'
import {
  navigate,
  evaluate,
  findElement,
  click,
  fillIn,
  getText
} from 'selenium-adapter'

injectAdapter()
injectTmpDirectory()

test('clicking on an element', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <span id="statusText"></span>
    <button onclick="window.statusText.textContent = 'Clicked'">
      Click Here
    </button>
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const button = await findElement(adapter, 'button', 'Click Here')
  await click(button)
  const status = await findElement(adapter, '#statusText')
  t.is(await getText(status), 'Clicked')
})

test('filling in an input element', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <input id="input">
    `
  })
  await navigate(adapter, fileUrls['index.html'])

  const input = await findElement(adapter, 'input')

  await fillIn(input, 'Hello')
  t.is(await evaluate(adapter, () => window.input.value), 'Hello')

  await fillIn(input, 'There')
  t.is(await evaluate(adapter, () => window.input.value), 'There')
})
