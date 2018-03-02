# 在vscode中使用standard

### 一、安装vs插件

JavaScript Standard Style
<!--more--> 
### 二、安装依赖包

1、babel-eslint or eslint
2、standard
3、eslint-plugin-html

在项目中执行
```
npm install babel-eslint standard eslint-plugin-html --save-dev
```

### 三、配置vscode

打开vscode配置：文件 -》首选项 -》设置	
在配置文件增加：
``` json
"standard.validate": [
    "javascript",
    "javascriptreact",
    "html"
],
"standard.options": {
    "plugins": [
        "html"
    ]
},
"files.associations": {
    "*.vue": "html"
}
```

###四、配置package.json
``` json
"standard": {
    "globals": [],
    "ignore": [],
    "plugins": [
        "html"
    ],
    "parser": "babel-eslint",
    "envs": [
        "browser",
        "node"
    ]
}
```



