# web-template

## 单元测试
这里有一些关于单元测试相关的介绍，单元测试编写的文章主要参考了一篇国外的文档javascript-testing-best-practices，结合自己的理解对这篇文章进行了翻译和补充。关于文章后半部分，因为缺少CI的相关实践所以暂时还没有充分的理解，后面会再做补充完善。
### 单元测试简介
* https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%AE%80%E4%BB%8B

### 所选技术栈
##### vue-test-utils：https://vue-test-utils.vuejs.org/zh/
提供了vue编写的组件测试的相关解决方法，底层基于Mocha，Chai，Sinon，Jsdom等；当然我们对函数等工具库编写单测的时候可以灵活搭配Mocha，Jest，Chai等使用。
##### jest：https://jestjs.io/en/
开箱即用，是一个集成框架，集成了断言库，覆盖率报告等多种功能。

### 编写示例
* 技术选型：Jest，@vue/test-utils
* 常用API：describe，test，expect
* 测试命令：jest add.spec.js 或 npm run test:unit
* 覆盖率命令：jest add.spec.js --coverage 或 npm run test:unit --coverage
#### 以测试add方法为例
```
// add.js

module.exports = function add(a, b) {
  return a + b;
};

```
```
// add.spec.js

const add = require('../../src/utils/add');

describe('add', () => {
  test('1+2 equals 3', () => {
    expect(add(1, 2)).toBe(3);
  });
});

```

### 如何分析覆盖率报告
* https://github.com/MR-yuhuashi/art-core/wiki/jest%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A%E5%88%86%E8%A7%A3

### 单元测试编写规范
* https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%BC%96%E5%86%99%E8%A7%84%E8%8C%83