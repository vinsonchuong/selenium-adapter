# selenium-adapter
[![Build Status](https://travis-ci.org/vinsonchuong/selenium-adapter.svg?branch=master)](https://travis-ci.org/vinsonchuong/selenium-adapter)

A promise adapter for [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/) for use with
[ES2017 async/await](https://github.com/lukehoban/ecmascript-asyncawait).

## Installing
`selenium-adapter` is available as an
[npm package](https://www.npmjs.com/package/selenium-adapter).

## Usage
```js
import Browser from 'selenium-adapter';

async function run() {
  const chrome = new Browser('chrome');
  await chrome.open('https://www.google.com');

  const searchBox = await chrome.find('input[name="q"]');
  await searchBox.fillIn('Hello World!')

  const searchButton = await chrome.find('input[value="Search"]');
  await searchButton.click();

  const body = await chrome.find('body');
  console.log(body.textContent);
}
run();
```

### API Documentation
#### Browser
An Class that mediates communication with a Selenium WebDriver client and
browser.

##### Constructor
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
}
run();
```
Creates a Selenium WebDriver client and configures it to open the given browser.
`chrome`, `firefox`, and `phantomjs` are support out-of-the-box as the
`selenium-adapter` package depends on `chromedriver`, `geckodriver` and
`phantomjs-prebuilt`.

##### Exit
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.exit();
}
run();
```
Closes the browser and Selenium WebDriver client.

##### Open
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  await browser.exit();
}
run();
```
Instructs the browser to open a URL using
[`WebDriver#get`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html#get).

##### Evaluate
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  console.log(await browser.evaluate('return window.navigator.userAgent'));
  await browser.exit();
}
run();
```
Instructs the browser to evaluate a JavaScript function body using
[`WebDriver#executeScript`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html#executeScript),
given as a string, within the context of the currently open page. The value
returned by the function body is serialized and returned by this method.

##### Find
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  const header = await browser.find('.header', {
    text: 'Pull Requests',
    wait: 2000
  });
  console.log(header.textContent);
}
run();
```
Finds an element on the currently open page given a CSS selector and optional
text substring using
[`WebDriver#findElement`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html#findElement)
and
[`By.xpath`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html#By.xpath)
and returns an instance of [Element](#element);

An optional number of milliseconds to `wait` can be provided. If provided, the
browser will be polled for a matching element up to the wait time using
[`WebDriver#wait`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/webdriver_exports_WebDriver.html#wait)
and
[`until.elementLocated`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html#elementLocated).

#### Element
A class that represents a snapshot of an element rendered in the page currently
opened in the browser. It exposes data about the element and provides an
interface for sending user actions to that element.

##### TextContent
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  const header = await browser.find('.header');
  console.log(header.textContent);
}
run();
```
The inner text of the element. It is read using
[`WebElement#getText`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html#getText).

##### Value
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  const searchBox = await browser.find('input[name="q"]');
  console.log(searchBox.value);
}
run();
```
The value of the input element.

##### Click
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  const pullRequests = await browser.find('a', {text: 'Pull requests'});
  await pullRequests.click();
}
run();
```
Instructs Selenium to click on this element using
[`WebElement#click`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html#click).

##### FillIn
```js
import Browser from 'selenium-adapter';

async function run() {
  const browser = new Browser('chrome');
  await browser.open('http://github.com');
  const searchBox = await browser.find('input[name="q"]');
  await searchBox.fillIn('React');
}
run();
```
Instructs Selenium to type a string into this input element using
[`WebElement#sendKeys`](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html#sendKeys).
