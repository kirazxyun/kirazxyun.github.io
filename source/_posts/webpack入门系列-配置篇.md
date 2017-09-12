### webpack入门-配置篇

#### 写在前面

对webpack一直都久仰大名，但是因为公司已经有打包构建的工具，也就没有想要探究的想法，初次对webpack有一些接触是在学习vue的过程中，为了让项目运行起来，看了一些简单的配置，至于其是如何运行的也是不管不顾，反正找些前人的配置放进去能用就行了。近来公司技术栈升级，连带着构建工具也改为基于webpack升级了，偷懒的人终于得到了惩罚，只能埋头苦读。	

这次的学习记录会分为几篇文章，从入门到各个知识点的学习感想。总结这两周看的许多文章和webpack的官方文档（当然是跳着看的），对于基本的配置已有些了解，也对很多的知识点存在着疑惑，此后会针对不明白的知识点单独学习和整理。	

这篇文章就作为开头，简单的记录下对webpack的理解和最最基本的配置。废话终于说完了。

#### 对webpack的初印象

webpack是个模块化管理和打包工具，它能够根据一定的规则和配置，将零散的模块整合后输出为生产需要的格式。也就是在开发的时候，你爱怎么拆分你的代码都行，最终，用webpack都能把这些模块整合成一个完整的js文件，你直接在html中引入就能工作了。	

所以我对webpack的印象就是，它就像一个学习的机器，它根据我们提供的入口，沿着入口开始分析依赖关系，沿途遇见的文件全部通过loader处理，直到终点，这样来形成一张依赖图谱，然后根据这张图谱将所有文件根据plugin再处理一遍后，根据定义好的输出格式输出到指定的位置。		

这边就涉及到了webpack的四个核心概念：入口、输出、loader、plugins

#### 入口（entry）

上面我们提到一个概念—[依赖图谱](http://www.css88.com/doc/webpack/concepts/dependency-graph/) ，这是我们处理依赖关系的蓝图，它是根据入口递归的生成的，包含了生成最终文件的所有模块。所以，一个入口文件就能生成一张依赖图，最终输出一个文件，供生产环境使用。所以，一般这个入口，是一个页面的主文件。

entry有3种格式：string|array|object

string—输出一个文件

```javascript
{
    entry: './src/main.js'
}
```

array—输出一个文件

```javascript
{
    entry: ['./src/main.js', './src/index.js']
}
```

Object--输出多个文件

```javascript
{
    entry: {
        main: './src/main.js',
        vendor: ['lodash', 'moment']
    }
}
```



#### 输出（output）

回想一下，当我们保存一个文件的时候需要做什么，首先要为这个文件定一个名字，然后为它指定一个文件夹用于存储。这边的输出主要做的就是这件事，filename定义文件名称，path定义存储位置。

只需要输出一个文件时：

```javascript
{
  output: {
      filename: 'bundle.js',
      path: './build'
  }
}
```

多个文件时，使用占位符

```javascript
{
    output: {
        filename: '[name].bundle.js',
        path: './build'
    }
}
```

这边的name，一个文件的时候为main，多个文件的时候就是入口定义的object的key。

对于输出，我们平常都会使用hash来处理浏览器缓存问题，webpack当然也有。

当需要hash的时候，这样定义输出

```javascript
{
    output: {
        filename: '[name].bundle@[hash].js',
        path: './build'
    }
}
```

> 对于hash，有很多不同的格式，至今我看过：hash、chunkhash、contenthash，关于这部分，后面会另外整理文章，先占个位 [webpack的hash](#)

至此，我们定义了webpack这个黑盒子的对外接触部分，反正我有的已经给你说了，我要的东西也说好了，你就好好工作吧，我就等着收成了。	

接下里就涉及到了webpack内部工作的部分

#### loader

webpack神奇在什么地方呢，它能处理各种各样的文件，怎么处理呢，它只认识js啊。loader做的事情，就是将各种文件转化为js模块，让它能够在webpack中流转。所以，像css，less，sass的文件在webpack都是转化成字符串在处理的，还有图片，字体文件等，也是一样。	

既然文件转化成js模块就能在webpack中被识别和处理，那也就是说任何种类的文件，只要你为他定义了loader，它就能打包进去，而且这些loader是第三方的，也就是，它是可以自主研发和安装的，只要你懂得node开发，你就能让webpack为你服务。

接下来列举一个es6语法转换es5的例子：

我们知道，es6转化es5用的是babel，要使用babel，首先要安装这个loader

```nginx
npm install babel-loader --save-dev
```

babel-loader只是一个webpack的处理器，要让babel工作，还需要手动安装babel-core和babel-preset-es2015

```nginx
npm install babel-core babel-preset-es2015 --save-dev
```

然后我们的配置：

```javascript
//webpack.config.js
{
    mudule: {
        rules: [{
            test: /\.js$/,
          	use: {
                loader: 'babel-loader',
              	options: {
                    preset: 'es2015'
                }
            },
          	include: './src'
        }]
    }
}
```

这边解释一下上面的配置：

test：正则匹配要处理的文件

use：定义处理该文件的loader，可以是string，array，object，多个处理器的使用array

​	loader:  处理器

​	options: 每个处理器还可以定制自己的配置

Include: 配置哪个文件夹底下的文件（相应的还有exclude）



> 关于use，有一点很重要的，就是在配置多个loader的时候，它是从右向左执行的。



以上，webpack就能处理各种文件了，也有输出了，如果你要的就是这么简单，那这些也就足够了。

但是，我们都是贪心的，我们希望得到更多，比如现在所有的东西都在一个js文件里，我希望抽离css，希望抽离公用的第三方组件，希望最终的文件能够使压缩和混搅的，希望整合的文件和源代码之间是有关联的等等等。

为了能够处理这些额外的任务，webpack还有一个核心概念—plugin，它就是来处理这些的。

#### plugins

我看过一句话是，plugin是能够处理除loader之外，你想要webpack为你处理的任何事情。想来plugin就是为了让我们达到各种定制化的东西而存在的。	

loader存在在依赖图谱生成的阶段，而plugin存在于webpack的打包完成的阶段，它的主要目的有两个：一是处理打包后的代码，例如增加注释，分割代码块等；二是辅助输出，例如清理以前生成的文件，自动在index.html中加入资源链接等。

plugin是一个个的实例，放在webpack配置文件的plugins字段中，以数组形式存在。因为它是一个个实例，在new的过程中还能传不同的配置实现不一样的功能。

webpack有自带的plugin，要用的时候要引入webpack。也可以安装第三方的，也就是和loader一样，你可以自己开发plugin，要用的时候安装一下，引进来就能用了。

例子来也：

在输出之前，把之前的文件清理掉：

因为是第三方的插件，首先要安装：

```nginx
npm install clean-webpack-plugin --save-dev
```

然后引入并配置：

```javascript
var CleanWebpackPlugin = require('clean-webpack-plugin');

{
    plugins: [
        new CleanWebpackPlugin(['build'])
    ]
}
```

在输出之前，将代码进行压缩

```javascript
var webpack = require('webpack');

{
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
}

```



#### 小结

以上，就是笔者对webpack最最基本的印象，也是最最核心和简单的配置。

最后，笔记还想记录一下关于webpack的一些小知识点：

> 1、webpack是运行在node环境中的，所以可以在配置文件中随意的使用node提供的任何东西。包括一些环境变量，路径，commonjs等等。

> 2、配置文件是js文件，意味着，你可以在里面写js代码来达到不同的目的，例如区分环境生成不一样的配置。

> 3、webpack支持所有的模块化方案，requirejs，es6 mudule，commonjs，css的import（这个当然是在有loader的情况下），所以，请收下我膝盖。

> 4、loader和plugin都是node模块，也就是说，webpack本身也是模块化实现的。

最后的最后，留下笔者感觉还搞不清楚的问题，用于在后续文章中检查是否能够回答这些问题。

> 1、抽取公用代码时，遇见了manifest和runtime，这些的具体意思是什么，是作何用处
>
> 2、webpack既然是运行于node环境，是否意味着，我的js文件中也写node代码
>
> 3、plugins的顺序是否有关系，是否跟loader一样有输入与输出的关系