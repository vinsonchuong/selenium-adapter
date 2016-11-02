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

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
