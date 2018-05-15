# 在vscode中使用eslint

### 一、安装vs插件

ESLint
<!--more--> 
### 二、安装依赖包

1、eslint
2、babel-eslint
3、eslint-plugin-html

以下是standard风格的依赖包
4、eslint-config-standard
5、eslint-plugin-standard
6、eslint-plugin-import
7、eslint-plugin-node
8、eslint-plugin-promise

在项目中执行
```
npm install eslint eslint-plugin-html --save-dev
npm install eslint-config-standard eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise --save-dev
```

``` json
// package.json
"devDependencies": {
    "babel-eslint": "^7.1.1",
    "eslint": "^4.14.0",
    "eslint-config-google": "^0.9.1",
    "eslint-config-standard": "^10.2.1",
    "eslint-plugin-html": "^4.0.1",
    "eslint-plugin-import": "^2.8.0",
    "eslint-plugin-node": "^5.2.1",
    "eslint-plugin-promise": "^3.6.0",
    "eslint-plugin-standard": "^3.0.1",
}
```

### 三、配置vscode

打开vscode配置：文件 -》首选项 -》设置    
在配置文件增加：
``` json
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue"
],
"eslint.options": {
    "plugins": [
        "html"
    ]
}
```

###四、配置eslint
``` json
// .eslintrc.json
{
    "extends": "standard",
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true
    },
    "plugins": [ 
        "html", 
        "standard" 
    ],
    "rules": {
        // 可在此处配置其他规则
    }
}
```



