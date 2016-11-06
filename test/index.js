import test from 'ava';
import tempfile from 'tempfile';
import Directory from 'directory-helpers';
import StaticServer from './helpers/StaticServer';
import Browser from 'selenium-adapter';

test('opening different browsers', async (t) => {
  async function assertUserAgent(browser, regex) {
    t.regex(await browser.evaluate('return window.navigator.userAgent'), regex);
  }

  const chrome = new Browser('chrome');
  await assertUserAgent(chrome, /Chrome/);
  await chrome.exit();

  const firefox = new Browser('firefox');
  await assertUserAgent(firefox, /Firefox/);
  await firefox.exit();

  const phantomjs = new Browser('phantomjs');
  await assertUserAgent(phantomjs, /PhantomJS/);
  await phantomjs.exit();
});

test.serial('opening a URL', async (t) => {
  const directory = new Directory(tempfile());
  const server = new StaticServer(directory, 8080);
  const browser = new Browser('chrome');

  await directory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <p>Hello World!</p>
    `
  });

  try {
    await browser.open('http://localhost:8080');
    const text = await browser.evaluate(`
      return document.querySelector('p').textContent;
    `);
    t.is(text, 'Hello World!');
  } finally {
    await browser.exit();
    await server.exit();
    await directory.remove();
  }
});

test.serial('finding elements', async (t) => {
  const directory = new Directory(tempfile());
  const server = new StaticServer(directory, 8080);
  const browser = new Browser('chrome');

  await directory.write({
    'index.html': `
    <!doctype html>
    <meta charset="utf-8">
    <p>Paragraph</p>
    <p class="paragraph">Paragraph With Class</p>
    <script>
      setTimeout(() => {
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Delayed Paragraph';
        document.body.appendChild(paragraph);
      }, 1000);
    </script>
    `
  });

  try {
    await browser.open('http://localhost:8080');

    const paragraph = await browser.find('p');
    t.is(paragraph.textContent, 'Paragraph');

    const paragraphWithClass = await browser.find('.paragraph');
    t.is(paragraphWithClass.textContent, 'Paragraph With Class');

    const paragraphByText = await browser.find('*', {text: 'Paragraph'});
    t.is(paragraphByText.textContent, 'Paragraph');

    const delayedParagraph = await browser.find('p', {
      text: 'Delayed Paragraph',
      wait: 2000
    });
    t.is(delayedParagraph.textContent, 'Delayed Paragraph');
  } finally {
    await browser.exit();
    await server.exit();
    await directory.remove();
  }
});