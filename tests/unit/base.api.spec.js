import { expect, assert } from 'chai';
import BaseModel from '../../src/api/base.js';
const ajaxInstance = new BaseModel();

describe('axios methods CURD', () => {
  it('Http get request correct', () => {
    ajaxInstance.url = 'http://127.0.0.1:9999/testme/get';

    return ajaxInstance.get().then(result => {
      expect(result).to.equal('get method success');
    });
  });

  it('Http get request error', () => {
    ajaxInstance.url = 'http://127.0.0.1:9999/testme/get/error';

    return ajaxInstance.get().then(result => {
      expect(result).to.equal('get method success');
    }).catch(err => {
      expect(err.actual).to.contain({
        errMsg: 'Something broke!',
        errStatus: 500
      });
    });
  });
});
