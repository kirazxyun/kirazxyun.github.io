(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{70:function(t,n,e){"use strict";e.r(n);var a=e(0),r=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"实现一个基于字符串的模板引擎"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实现一个基于字符串的模板引擎","aria-hidden":"true"}},[t._v("#")]),t._v(" 实现一个基于字符串的模板引擎")]),e("h2",{attrs:{id:"一、什么是模板引擎"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、什么是模板引擎","aria-hidden":"true"}},[t._v("#")]),t._v(" 一、什么是模板引擎")]),e("p",[t._v("模板引擎定义为输入模板字符串 + 数据，得到渲染过的字符串。它看起来很神秘，能把十分麻烦的字符串拼接，变成像写html那样直观和简单。")]),e("p",[t._v("使用模板引擎来替代普通的字符串拼接的优势很明显，首先手写的字符串拼接是很容易出错的，其次是非常的不容易维护，相信如果让你写50行的tpl会是一件很艰难的事情，何况以后还得在上面修修改改，不小心删掉一个+号就能排查半天bug。")]),e("p",[t._v("而模板引擎能帮我们解决上面列举的所有问题，你所要做的是按照它给的模板语法，像写html一样写tpl，然后扔一串数据给它就行了。简单、直观还容易维护。")]),e("p",[t._v("我们看个简单的例子：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var data = {\n    name: 'lily',\n    age: 18\n};\nvar tpl = \"my name is <%name%>, I'm <%age%> years old.\";\n\ntplEngine(tpl, data);\n//\"my name is lily, I'm 18 years old.\"\n")])]),e("p",[t._v("再比如：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<ul>\n    <% for(var i = 0, len = items.length; i < len; i++){ %>\n        <li><% items[i] %></li>\n    <% } %>\n</ul>\n\nvar item = ['香蕉', '苹果', '凤梨'];\n\ntplEngine(tpl, data);\n\n\n//我们希望得到的\n<ul>\n    <li>香蕉</li>\n    <li>苹果</li>\n    <li>凤梨</li>\n</ul>\n")])]),e("h2",{attrs:{id:"二、模板引擎的实现原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二、模板引擎的实现原理","aria-hidden":"true"}},[t._v("#")]),t._v(" 二、模板引擎的实现原理")]),e("p",[t._v("既然想要实现一个最简单的模板引擎，我们就先定下目标，这个模板引擎能实现的功能如下：")]),e("h3",{attrs:{id:"功能"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#功能","aria-hidden":"true"}},[t._v("#")]),t._v(" 功能")]),e("ol",[e("li",[t._v("简单的插值")])]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<% name %>\n")])]),e("ol",{attrs:{start:"2"}},[e("li",[t._v("逻辑语句")])]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<% for(var i = 0, len = array.length; i < len; i++) {\n    var item = array[i];\n    //do something with item\n} %>\n\n")])]),e("h3",{attrs:{id:"实现"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#实现","aria-hidden":"true"}},[t._v("#")]),t._v(" 实现")]),e("p",[t._v("我们将模板作为字符串传进模板引擎后，它会根据它自己的语法对其进行解析，转换成一个渲染方法后返回，然后调用这个方法，并将数据传进去，就能得到渲染好的字符串。这个是模板引擎实现的一个思路，根据这个思路，我们能给出模板引擎的一个框架如下：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var tplEngine = function(tpl, data) {\n    //对tpl进行转化\n    var render = function (data) {\n        //这部分是实时编译生成的函数体\n    }\n    return render(data);\n}\n")])]),e("p",[t._v("tplEngine即模板引擎，它接受两个参数，tpl即模板字符串，data是数据。"),e("br"),t._v("\nrender是渲染函数，其接受一个参数，即数据，最终由render返回渲染好的字符串。")]),e("p",[t._v("可以看出，我们的关键问题是，渲染方法render的实现：")]),e("h4",{attrs:{id:"_1、将字符串转化为函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、将字符串转化为函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 1、将字符串转化为函数")]),e("p",[t._v("因为我们传进去的模板是字符串，我们先不考虑中间的过程怎么样，我们先考虑当你将得到函数体的字符串格式的时候，怎么办，如何将其变成一个真正可执行的函数，不由得想到了eval，但是明显它并不能实现我们要的。"),e("br"),t._v("\n这里，就要给出一个大家比较不熟悉的用法：new Function();")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("//平常声明fun是这样的：\nvar f = function(x, y) { return x + y; };\n\n//用Function是这样的：\nvar f = new Function('x', 'y', 'return x + y;');\n//重点是，必须全部是字符串，前面是参数，最后一个参数是函数体\n")])]),e("p",[t._v("解决了这最后一公里的问题，我们将目光聚焦于如果将字符串转化为render的函数体。")]),e("h4",{attrs:{id:"_2、提取要处理的内容"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、提取要处理的内容","aria-hidden":"true"}},[t._v("#")]),t._v(" 2、提取要处理的内容")]),e("p",[t._v("我们得到一段字符串，首先得处理是将其进行分解：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("<ul>\n    <% for(var i = 0, len = items.length; i < len; i++){ %>\n        <li><% items[i] %></li>\n    <% } %>\n</ul>\n")])]),e("p",[t._v("观察这段模板，我们能初步分解内容为：js和html"),e("br"),t._v("\n要从一段字符串中提取东西，相信大家都知道要用正则，\n没错我们正是要通过正则来实现匹配内容的提取。")]),e("p",[t._v("根据js的边界符，我们给出这样的一个则正表达式：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var jsReg = /<%([^%>]+)?%>/g;\n")])]),e("p",[t._v("我们将上面的模板分解到一个数组中试试看：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('//字符串：\n var tpl = "<ul>" + \n            "<% for(var i = 0, len = items.length; i < len; i++){ %>" + \n                "<li><% items[i] %></li>" +\n            "<% } %>" +\n           "</ul>";\n\n//提取js的正则\nvar match = [];\nvar reg = /<%([^%>]+)?%>/g;\nvar str = [];\nvar cursor = 0;\nwhile(match = reg.exec(tpl)) {\n    var index = match.index;\n    var jsCode = match[1];\n    var html = tpl.slice(cursor, index);\n    str.push(html)\n    str.push(jsCode);\n    cursor = index + match[0].length;\n}\nstr.push(tpl.substr(cursor, tpl.length - cursor));\nconsole.log(str);\n//"<ul>"\n//" for(var i = 0, len = items.length; i < len; i++){ "\n//"<li>"\n//" items[i] "\n//"</li>"\n//" } "\n//"</ul>"\n\n')])]),e("p",[t._v("结果很棒，是我们想要的结果，将js和html都分离开了。但是其实上面这个分解还不够充分，想想我们一开始定的目标，js是分为插值和逻辑语句的，很容易分辨出：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('//插值：\n"items[i] "\n\n//语句：\nfor(var i = 0, len = items.length; i < len; i++){\n}\n')])]),e("p",[t._v("这边我们再给出一个正则：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("\n//判断逻辑语句的正则\nvar logicReg = /^( )*(if|for|else|switch|case|break|{|})(.*)/g\n")])]),e("p",[t._v("可以看到这边是用枚举的方式，这样其实并不完整，我们最后会给出改进方法。\n这样，我们就把模板分解为：")]),e("ul",[e("li",[t._v("变量插值")]),e("li",[t._v("可执行的逻辑语句")]),e("li",[t._v("普通的html字符串")])]),e("h4",{attrs:{id:"_3、用数组拼接字符串"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、用数组拼接字符串","aria-hidden":"true"}},[t._v("#")]),t._v(" 3、用数组拼接字符串")]),e("p",[t._v("如果现在你要写的是字符串拼接，你会怎么做，我们先给出一个平常写字符串拼接的例子，帮助大家理解如何处理上面分解出的3种模板分支：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var html = [];\nhtml.push('<ul>');\nfor(var i = 0, len = data.items.length; i < len; i++){\n   html.push('<li>', data.items[i], '</li>');\n}\nhtml.push('ul');\nreturn html.join('');\n")])]),e("p",[t._v("我们经常采用数组来拼接字符串，当然也可以用加号来拼接，看大家习惯，不过这边要说的一点是在低版本的ie中join方法的效率是比较好的，但是在现代流行的浏览器中，加号拼接的效率要远高于join。")]),e("p",[t._v("这边，我们不难总结出以下处理方法：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var html = [];\nif(变量) { \n    html.push(变量);\n} else if(语句){\n    执行\n} else {\n    html.push(字符串);\n}\nreturn html.join('');\n")])]),e("p",[t._v("最终将其进行字符串拼接，函数体就搞定了，如下：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var funcBody = \"var html = [];\\n\";\nvar logicReg = /^( )*(if|for|else|switch|case|break|{|})(.*)/g; \nvar connectFuncBody = function(line, isJsCode) {\n        if(isJsCode) {\n            if(logicReg.test(line)) {\n                funcBody += line + '\\n'; //js逻辑就不要放到html.push里面\n            } else {\n        \tfuncBody += 'html.push(' + line + ');\\n'; //变量直接放到html.push\n            }\n        } else {\n        \tfuncBody += 'html.push(\"' + line.replace(/\"/g, '\\\\\"') + '\");\\n'; //html转义引号后，放到html.push\n        }\n};\nvar funcBody = \"return html.join('');\\n\";\n")])]),e("p",[t._v("connectFuncBody接受两个参数，line是分解出的某个分支，isJsCode标识它是不是一个js，可能是变量，也可能是语句。"),e("br"),t._v("\n对于变量，将其拼接到html.push中，这样最终它就会变成html.push(item[i]);"),e("br"),t._v("\n对于语句，将其直接拼接到函数体上，这样最终它在运行的时候就直接执行了。\n对于字符串，则进行了一次双引号的转义操作，这是因为我们push的时候用的双引号作为string的标识。")]),e("h4",{attrs:{id:"_4、引擎函数"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4、引擎函数","aria-hidden":"true"}},[t._v("#")]),t._v(" 4、引擎函数")]),e("p",[t._v("到此为止，我们已经得到了渲染函数的函数体，也知道如何将其转换为函数，那我们的引擎函数就基本成形了，如下：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var tplEngine = function(tpl, data) {\n    //对tpl进行转化\n    var match = [];\n    var jsReg = /<%([^%>]+)?%>/g;\n    var logicReg = /^( )*(if|for|else|switch|case|break|{|})(.*)/g;\n    var cursor = 0;\n    var funcBody = 'var html = [];\\n';\n    //拼接函数\n    var connectFuncBody = function(line, isJsCode) {\n        if(isJsCode) {\n            if(logicReg.test(line)) {\n                funcBody += line + '\\n'; //js逻辑就不要放到html.push里面\n            } else {\n                funcBody += 'html.push(' + line + ');\\n';\n            }\n        } else {\n            funcBody += 'html.push(\"' + line.replace(/\"/g, '\\\\\"') + '\");\\n';\n        }\n    };\n    while(match = jsReg.exec(tpl)) {\n        var index = match.index;\n        var jsCode = match[1];\n        var html = tpl.slice(cursor, index);\n        connectFuncBody(html);\n        connectFuncBody(jsCode, true);\n        cursor = index + match[0].length;\n    }\n    connectFuncBody(tpl.substr(cursor, tpl.length - cursor));\n    funcBody += 'return html.join(\"\");';\n    return new Function('data', funcBody)(data);\n};\n")])]),e("h4",{attrs:{id:"_5、应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_5、应用","aria-hidden":"true"}},[t._v("#")]),t._v(" 5、应用")]),e("p",[t._v("要真正的用html的方式编写tpl，那就得将tpl存储在script（template）或者 放在text或者textarea里面，它会提供一个ID，我们通过id去找，找的到就将其取出来，text或者textarea用value，其他的用innerHTML。"),e("br"),t._v("\n在tepEngine外面再包装一层如下：")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v("var engine = function (str, data) {\n\tvar html = '';\n\tvar el = document.getElementById(str);\n\tif(!el) {\n\t\thtml = str;\n\t} else {\n\t\tif(/^(INPUT|TEXTAREA)$/.test(el.nodeName)) {\n\t\t\thtml = el.value;\n\t\t} else {\n\t\t\thtml = el.innerHTML;\n\t\t}\n\t}\n\treturn tplEngine(html, data);\n};\n")])]),e("p",[t._v("这个函数很好理解，它接受一个字符串和一个数据，字符串可以是一个id，我们先在页面找id，如果没有内容则将其判定为一个模板，直接执行tplEngine。如果根据id找到内容了，则将其取出来，再传到tplEngine里面执行。")]),e("h4",{attrs:{id:"_6、总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_6、总结","aria-hidden":"true"}},[t._v("#")]),t._v(" 6、总结")]),e("p",[t._v("这段不到30行的代码就能实现一个简单的模板引擎，其中还有很多是需要补充和完善的，但我们今天只是为了学习引擎函数的实现原理，就不再细化。"),e("br"),t._v("\n总结一下：")]),e("blockquote",[e("h4",{attrs:{id:"模板引擎的实现原理"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#模板引擎的实现原理","aria-hidden":"true"}},[t._v("#")]),t._v(" 模板引擎的实现原理")]),e("ol",[e("li",[t._v("利用正则匹配出3种模块分支。")]),e("li",[t._v("根据每个分支的不同拼接函数体")]),e("li",[t._v("利用Function转换渲染函数")]),e("li",[t._v("data放进去执行渲染函数")])])]),e("p",[t._v("基于字符串的前端模板引擎非常的多，但是其原理大同小异，了解了基本原理再去理解各类模板引擎就容易的多。")]),e("h3",{attrs:{id:"三、遗留问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三、遗留问题","aria-hidden":"true"}},[t._v("#")]),t._v(" 三、遗留问题")]),e("p",[t._v("这个引擎模板确实有很多要改进的地方，最后的最后，我们给出几个前进的方向。")]),e("ol",[e("li",[t._v("预编译：这个可以参考一下传说中最快的模板引擎artTemplate，因为渲染函数都是动态编译的，所以每次都是渲染赋值和编译一起执行，而预编译则是在你要渲染赋值之前就把渲染函数准备好了，类似于require的编译。")]),e("li",[t._v("缓存：将同一个id或者模板编译成的渲染函数存起来，以便多次使用，不必每次都编译。")]),e("li",[t._v("区分逻辑和变量的边界符，这个就是不必要进行逻辑语句的判断，上文提过要改进的地方。")]),e("li",[t._v("对模板去掉前后空格")])]),e("h4",{attrs:{id:"参考文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文章","aria-hidden":"true"}},[t._v("#")]),t._v(" 参考文章")]),e("p",[t._v("1、"),e("a",{attrs:{href:"http://www.cnblogs.com/hustskyking/p/principle-of-javascript-template.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("JavaScript模板引擎原理，几行代码的事儿")])]),e("p",[t._v("2、"),e("a",{attrs:{href:"https://segmentfault.com/a/1190000006990480",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端模板的原理和实现")])])])}],!1,null,null,null);n.default=r.exports}}]);