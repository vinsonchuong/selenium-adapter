/* @flow */
import test from 'ava'
import {
  injectAdapter,
  injectTmpDirectory
} from 'selenium-adapter/test/helpers/inject'
import { navigate, findElement, waitFor, getText } from 'selenium-adapter'

injectAdapter()
injectTmpDirectory()

test('failing to find any element', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const paragraph = await findElement(adapter, 'p')
  t.falsy(paragraph)
})

test('finding an element by CSS selector', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <p class="foo" id="bar">Paragraph</p>
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const paragraph = await findElement(adapter, 'p.foo#bar')
  t.is(await getText(paragraph), 'Paragraph')
})

test('finding an element by CSS selector and text', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <p>Other</p>
    <p>Paragraph</p>
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const paragraph = await findElement(adapter, 'p', 'Paragraph')
  t.is(await getText(paragraph), 'Paragraph')
})

test('waiting for an element to exist', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <script>
    setTimeout(() => {
      document.body.insertAdjacentHTML('afterbegin', '<p>Hello</p>')
    }, 500)
    </script>
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const paragraph = await waitFor(500, () => findElement(adapter, 'p'))
  t.truthy(paragraph)
})

test('waiting for an element that will never exist', async t => {
  const { adapter, tmpDirectory } = t.context
  const fileUrls = await tmpDirectory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    `
  })
  await navigate(adapter, fileUrls['index.html'])
  const paragraph = await waitFor(500, () => findElement(adapter, 'p'))
  t.falsy(paragraph)
})
