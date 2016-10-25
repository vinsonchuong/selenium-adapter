import test from 'ava';
import seleniumAdapter from 'selenium-adapter';

test((t) => {
  t.is(seleniumAdapter(), 'Hello World!');
});
