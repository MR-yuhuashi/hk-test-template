const add = require('../../src/utils/add');

describe('add', () => {
  test('1+2 equals 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});