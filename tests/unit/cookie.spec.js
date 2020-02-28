import { setCookie, getCookie,  delCookie, delStorage, setStorage, getStorage } from '../../src/utils/cookie';
import { expect } from 'chai';

beforeEach(() => {
  document.cookie = '';
});

describe('getCookie', () => {
  it('set correct cookie', () => {
    setCookie('age', 18);
    expect(document.cookie).to.equal('; age=18');
  });
});

describe('setCookie', () => {
  it('get correct cookie', () => {
    setCookie('age', 18);
    setCookie('sex', 'F');
    expect(getCookie('sex')).to.equal('F');
  });
});

describe('delStorage', () => {
  it('delete correct cookie', () => {
    setCookie('age', 18);
    setCookie('sex', 'F');
    expect(document.cookie).to.equal('; age=18; sex=F');
    delCookie('age');
    expect(document.cookie).to.equal('; sex=F');
  });
});


describe('Storage Methods', () => {
  it('setStorage, getStorage and delStorage', () => {
    setStorage('age', 18);
    setStorage('job', 'student');

    expect(window.localStorage).to.include({
      age: '18',
      job: 'student'
    });
    expect(getStorage('age')).to.equal('18');
    expect(getStorage('job')).to.equal('student');

    delStorage('age');

    expect(window.localStorage).to.not.include({
      age: '18'
    });
  });
});


