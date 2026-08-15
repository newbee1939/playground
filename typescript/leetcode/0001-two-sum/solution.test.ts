import assert from 'node:assert/strict';
import { test } from 'node:test';

import { twoSum } from './solution.ts';

// 問題ページの Example をそのままケースにする
test('example 1', () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});

test('example 2', () => {
  assert.deepEqual(twoSum([3, 2, 4], 6), [1, 2]);
});

test('example 3', () => {
  assert.deepEqual(twoSum([3, 3], 6), [0, 1]);
});
