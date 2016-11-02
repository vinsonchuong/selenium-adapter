import test from 'ava';
import tempfile from 'tempfile';
import Directory from 'directory-helpers';
import StaticServer from './helpers/StaticServer';
import Browser from 'selenium-adapter';

test('opens different browsers', async (t) => {
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

test('opens a URL', async (t) => {
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
  await browser.open('http://localhost:8080');
  const text = await browser.evaluate(`
    return document.querySelector('p').textContent;
  `);
  t.is(text, 'Hello World!');

  await browser.exit();
  await server.exit();
  await directory.remove();
});
