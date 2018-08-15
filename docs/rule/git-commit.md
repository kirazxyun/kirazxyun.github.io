# git commit message规范

## 一、规范说明

### 1、格式
```cmd
<type>(<scope>?): <subject>
空行
<body>?
空行
<footer>?
```
[Angular规范说明](https://conventionalcommits.org/lang/zh-Hans)
### 2、字段说明
#### type(必填)
用于说明commit类别
+ __feat__ 新功能（feature）
+ __fix__ 修复bug
+ __docs__  文档相关（README、CHANGLELOG）
+ __style__  代码格式相关（不影响代码逻辑，如缩进、空格、换行等）
+ __refactor__ 代码重构（没有添加新功能或者修复bug） 
+ __pref__ 优化相关（提升性能） 
+ __test__ 测试用例 
+ __chore__ 改变构建流程、或者增加依赖库、工具等 
+ __revert__ 回滚到上一个版本 

> 如果type是*feat*、*fix*，则commit将出现在chonglog中 

#### scope(选填)
标识影响范围
+ __global__ 全局 
+ __module__ 模块
+ __component__ 组件
+ __api__ 接口
+ ...

#### subject(必填)
对提交做一个简单的描述

+ 以动词开头，使用第一人称现在时，比如change，而不是changed或changes
+ 第一个字母小写
+ 长度不大于72（如果需要大量的信息描述，请采用body部分）
+ 结尾不加句号

#### body(选填)
对提交的详细描述，可以分成多行

+ 使用第一人称现在时，比如使用 change 而不是 changed 或者 changes
+ 说明代码变更的原因，以及和以前代码的对比

#### footer(选填)

+ __BREAKING CHANGE__ 不兼容变动, 如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法
+ __关闭Issue__ Close开头
```
Close #123, #245
```
>BREAKING CHANGE将会出现在changelog中
### 3、例子
#### 最简单 *type: subject* 
```cmd
feat: add scheme rule page
chore: add lodash
```
#### 带scope
```
feat(api): add api of task
```
#### 带body
```
fix: change the params of getTags

后端接口需要添加组件名称参数
```
#### 带footer
```
refactor: change src structure

BREAKING CHANGE: 对src目录结构进行调整，新结构与原来不兼容
```

#### 完整
```
refactor(src): change src structure

为了实现十万+代码组织

BREAKING CHANGE: 对src目录结构进行调整，新结构与原来不兼容
```

### 4、关于回滚
如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header
```
revert: feat(pencil): add 'graphiteWidth' option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02
```
body部分的格式是固定的，必须写成
```
This reverts commit &lt;hash>
```
其中的hash是被撤销 commit 的 SHA 标识符。

如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。
## 二、安装和配置

### 1、安装
```cmd
npm install --save-dev @commitlint/cli
npm install --save-dev @commitlint/config-conventional
npm install --save-dev husky
npm install --save-dev conventional-changelog-cli
```

其中

1. 规范检查工具：[commitlint](http://marionebl.github.io/commitlint/#/)
2. 规范规则风格：[config-conventional](https://github.com/marionebl/commitlint/blob/master/%40commitlint/config-conventional/index.js)
3. git钩子：[husky](https://github.com/typicode/husky)
4. 生成changlog：[conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

### 2、配置commintlint

```js
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 配置额外的rule
  }
}
```
[全部rule](http://marionebl.github.io/commitlint/#/reference-rules)

[conventional的rule](https://github.com/marionebl/commitlint/blob/master/%40commitlint/config-conventional/index.js)

### 3、配置git钩子
```json
// package.json
{
  "scripts": {
    "commitmsg": "commitlint -E GIT_PARAMS"
  }
}
```

### 4、生成changlog
```json
// package.json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  }
}
```