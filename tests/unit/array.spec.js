import { isArray } from '../../src/utils/array';
import { expect } from 'chai';
import forEach from 'mocha-each';

describe('isArray', () => {
  const data = [
    ['Number', 1, false],
    ['String', '1', false],
    ['Boolean', true, false],
    ['Null', null, false],
    ['Undefined', undefined, false],
    ['Object', {}, false],
    ['Array', [], true]
  ];
  forEach(data).it('type %s such as %j will return %j', (type, item, expected) => {
    expect(isArray(item)).to.be[expected];
  });
});
