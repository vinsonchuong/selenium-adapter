import test from 'ava';
import seleniumAdapter from '../src/index';

test((t) => {
  t.is(seleniumAdapter(), 'Hello World!');
});
