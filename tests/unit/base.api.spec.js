import BaseModel from '../../src/api/base.js';
const ajaxInstance = new BaseModel();

describe('axios methods CURD', () => {
  test('Http get request correct', () => {
    ajaxInstance.url = 'http://127.0.0.1:9999/testme/get';

    expect.assertions(1);

    return expect(
      ajaxInstance.get().then((result) => {
        return result;
      })
    ).resolves.toBe('get method success');
  })

  test('Http get request error', () => {
    ajaxInstance.url = 'http://127.0.0.1:9999/testme/get/error';
  
    expect.assertions(1);

    return expect(
      ajaxInstance.get().then((result) => {
        return result;
      })
    ).resolves.toMatchObject({
      errMsg: 'Something broke!',
      errStatus: 500
    });
  });
})


