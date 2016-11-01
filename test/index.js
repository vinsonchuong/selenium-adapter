import test from 'ava';
import {sleep} from 'esnext-async';
import Browser from 'selenium-adapter';

const browser = new Browser('firefox');

test(async (t) => {
  await browser.open('http://www.google.com/ncr');

  const searchBox = await browser.find('[name="q"]');
  await searchBox.fillIn('webdriver');

  const searchButton = await browser.find('[name="btnG"]');
  await searchButton.click();
});

test.after.always(async () => {
  await browser.exit();
});
