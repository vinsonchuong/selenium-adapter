# selenium-adapter
[![Build Status](https://travis-ci.org/vinsonchuong/selenium-adapter.svg?branch=master)](https://travis-ci.org/vinsonchuong/selenium-adapter)

A promise adapter for [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/) for use with
[ES2017 async/await](https://github.com/lukehoban/ecmascript-asyncawait).

## Installing
`selenium-adapter` is available as an
[npm package](https://www.npmjs.com/package/selenium-adapter).

### Dependencies
ChromeDriver depends on the system libraries `libxi6` and `libgconf-2-4`, which
need to be installed before installing `selenium-adapter`.

Note that `selenium-adapter` is only tested against recent versions of Chrome
and Firefox.

## Usage
```js
import {
  makeHeadlessChromeAdapter,
  close,
  navigate,
  findElement,
  click,
  fillIn,
  getText
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.google.com')

  const searchBox = await findElement(chrome, 'input[name="q"]')
  await fillIn(searchBox, 'Hello World!')

  const searchButton = await findElement(chrome, 'input[value="Search"]')
  await click(searchButton)

  const body = await findElement(chrome, 'body')

  console.log(await getText(body))
}
run();
```

### Choosing a Browser

#### `function makeChromeAdapter(): WebDriver`
```js
import {makeChromeAdapter} from 'selenium-adapter'

async function run() {
  const chrome = makeChromeAdapter()
}
run();
```

Creates a Selenium
[WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)
instance that controls a Chrome/Chromium browser via ChromeDriver.

#### `function makeHeadlessChromeAdapter(): WebDriver`
```js
import {makeHeadlessChromeAdapter} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
}
run();
```

Creates a Selenium
[WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)
instance that controls a Chrome/Chromium browser in headless mode via
ChromeDriver.

#### `function makeFirefoxAdapter(): WebDriver`
```js
import {makeFirefoxAdapter} from 'selenium-adapter'

async function run() {
  const firefox = makeFirefoxAdapter()
}
run();
```
Creates a Selenium
[WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)
instance that controls a Firefox browser via GeckoDriver.

#### `function makePhantomAdapter(): WebDriver`
```js
import {makePhantomAdapter} from 'selenium-adapter'

async function run() {
  const phantom = makePhantomAdapter()
}
run();
```
Creates a Selenium
[WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_ThenableWebDriver.html)
instance that controls a PhantomJS browser.

### Interacting With The Browser

#### `function close(adapter: WebDriver): Promise<void>`
```js
import {makeHeadlessChromeAdapter, close} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await close(chrome)
}
run();
```

Closes the browser and Selenium WebDriver client.

#### `function navigate(adapter: WebDriver, url: string): Promise<void>`
```js
import {makeHeadlessChromeAdapter, navigate} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://google.com')
}
run();
```

Navigate to a given URL.

In Chrome, if navigation fails due to a connection error or an HTTP status code
in the 400s or 500s, an error will be raised.

#### `function evaluate<T> (adapter: WebDriver, fn: () => T): Promise<T>`
```js
import {makeHeadlessChromeAdapter, navigate, evaluate} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://google.com')
  console.log(await evaluate(chrome, () => document.title))
}
run();
```

Evaluate a JavaScript function within the context of the currently open page.
The function's return value is serialized and returned. Note that the function
will only have access to local variables defined inside of the function.

#### `function findElement (adapterOrElement: WebDriver | ?WebDriverElement, selector: string, text: ?string): Promise<?WebDriverElement>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.npmjs.com')
  const header = await findElement(chrome, 'header')
  const searchBox = await findElement(header, '[name="q"]')
  const searchSubmit = await findElement(header, 'button', 'Search')
}
run();
```

Finds the first element matching a CSS selector and optionally containing a
string. If no matching element is found, `null` is returned. If an adapter is
given as first argument, the search is scoped to the entire page. If an element
is given, the search is scoped to only descendants of that element.

For the use case of finding an element that will exist after a delay (e.g. upon
completion of an HTTP request), see
[`waitFor`](#function-waitfort-time-number-getresult---promiset-promiset)

### Interacting With Elements

#### `function getAttribute (element: ?WebDriverElement): Promise<?string>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement,
  getAttribute
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.npmjs.com')
  const searchBox = await findElement(chrome, 'input[name="q"]')
  console.log(await getAttribute(searchBox, 'value'))
  console.log(await getAttribute(searchBox, 'placeholder'))
}
run();
```

Reads an attribute, or if not present, a property by name for an element.

#### `function getText (element: ?WebDriverElement): Promise<?string>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement,
  getText
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.npmjs.com')
  const title = await findElement(chrome, 'h1')
  console.log(await getText(title))
}
run();
```

Reads the text contained within an element.

#### `function click (element: ?WebDriverElement): Promise<void>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement,
  click
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.npmjs.com')
  const signUp = await findElement(chrome, 'a', 'Sign up for npm')
  await click(signUp)
}
run();
```

Clicks on a given element

#### `function fillIn (element: ?WebDriverElement, value: string): Promise<void>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement,
  fillIn
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'https://www.npmjs.com')
  const searchBox = await findElement(chrome, '[name="q"]')
  await fillIn(searchBox, 'A Query')
  await fillIn(searchBox, 'A Different Query')
}
run();
```

Given an input element, clears its value and types in a new value.

### Utilities

#### `function waitFor<T> (time: number, getResult: () => Promise<T>): Promise<?T>`
```js
import {
  makeHeadlessChromeAdapter,
  navigate,
  findElement,
  waitFor
} from 'selenium-adapter'

async function run() {
  const chrome = makeHeadlessChromeAdapter()
  await navigate(chrome, 'http://localhost:8080')
  const delayedButton = waitFor(2000, () => findElement(chrome, 'button'))
}
run();
```

Run the given function over and over until it returns a truthy value. If a
truthy value is not returned within the given number of milliseconds, `null` is
returned.
