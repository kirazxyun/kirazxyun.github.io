# git commit message规范

## 一、规范说明

### 基本规范
```cmd
<type>(<scope>?): <subject>
空行
<body>?
空行
<footer>?
```

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

## 三、参考文档

1. [规范说明](https://conventionalcommits.org/lang/zh-Hans)
2. 
3. 
4. 