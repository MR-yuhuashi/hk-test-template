import { setCookie, getCookie,  delCookie, delStorage, setStorage, getStorage } from '../../src/utils/cookie';

beforeEach(() => {
  document.cookie = '';
});

describe('getCookie', () => {
  test('set correct cookie', () => {
    setCookie('age', 18);
    expect(document.cookie).toBe('; age=18');
  });
});

describe('setCookie', () => {
  test('get correct cookie', () => {
    setCookie('age', 18);
    setCookie('sex', 'F');
    expect(getCookie('sex')).toBe('F');
  });
});

describe('delStorage', () => {
  test('delete correct cookie', () => {
    setCookie('age', 18);
    setCookie('sex', 'F');
    expect(document.cookie).toBe('; age=18; sex=F');
    delCookie('age');
    expect(document.cookie).toBe('; sex=F');
  });
});


describe('Storage Methods', () => {
  test('setStorage, getStorage and delStorage', () => {
    setStorage('age', 18);
    setStorage('job', 'student');

    expect(window.localStorage).toMatchObject({
      age: '18',
      job: 'student'
    });
    expect(getStorage('age')).toBe('18');
    expect(getStorage('job')).toBe('student');

    delStorage('age');

    expect(window.localStorage).not.toMatchObject({
      age: '18'
    });
  });
});


