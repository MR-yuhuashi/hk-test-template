# web-template

## 单元测试
* 简介：https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%AE%80%E4%BB%8B
* 规范：https://github.com/MR-yuhuashi/art-core/wiki/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E7%BC%96%E5%86%99%E8%A7%84%E8%8C%83
### 技术栈
#### Mocha: https://mochajs.org/
* （还有jest）是一个运行测试的框架

#### Chai: https://www.chaijs.com/api/assert/
* https://www.npmjs.com/package/chai
* 是一个支持多种风格（比如 expect、should 和 assert）的断言库。

#### Karma: https://www.npmjs.com/package/karma
* 不是测试框架，也不是断言库；而是一个测试运行器，test runner。可以在不同的真实浏览器或者CI上运行test case。

#### vue-test-utils
* 是 Vue.js 官方的单元测试实用工具库。
* 实现技术栈：chai,mocha,sinon,karma

### 编写思路
* 给函数写
* 给service写
* 给组件写

### 编写难点
* 特性：
钩子


mock
* 各个场景的模拟：回调函数-sinon、Timer函数（setTimeout，clearTimeout等）

### 测试报告

挂载组件，测试组件渲染出来的HTML，模拟用户交互，测试nextTick。

UI常用技巧：
* 明白要测试的是什么：只关注输入与输出，不关注细节，不追求100%的覆盖率。
* 浅渲染，只关注单独的组件，不关注子组件。


mocha-each: npm install --save-dev mocha-each

cookie的document和window是怎么处理的
