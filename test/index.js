import test from 'ava';
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
