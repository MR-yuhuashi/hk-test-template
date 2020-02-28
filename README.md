# web-template


## 单元测试
这里有一些关于单元测试相关的介绍，我直接引用自己之前总结的单元测试简介和常用规范两篇文章。单测规范的文章主要参考了一篇国外的文档javascript-testing-best-practices，结合自己的理解对这篇文章进行了翻译和补充。关于文章后半部分，因为缺少CI的相关实践所以暂时还没有充分的理解，后面会再做补充完善。
### 单元测试简介
* https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%AE%80%E4%BB%8B

### 单元测试规范
* https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%BC%96%E5%86%99%E8%A7%84%E8%8C%83

### vue相关技术栈
vue-test-utils：https://vue-test-utils.vuejs.org/zh/提供了组件测试的相关解决方法，底层基于Mocha，Chai，Sinon，Jsdom等；当然我们对函数等工具库编写单测的时候可以灵活搭配Mocha，Jest，Chai等使用。

#### Mocha: https://mochajs.org/
* （还有jest）是一个运行测试的框架

#### Chai: https://www.chaijs.com/api/assert/，https://www.npmjs.com/package/chai
* 是一个支持多种风格（比如 expect、should 和 assert）的断言库。




