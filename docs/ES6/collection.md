# ES6学习之集合

#### 写在前面

在学习es6的过程中，笔者感觉有点混乱的是es中新增的数据结构，和它们之前的转换关系，好不容易终于认清了里面的关系，所以特此总结一篇文章来记录一下。

<!--more--> 

#### es6之前

es6出现之前，js拥有5种基础数据类型，还有2种引用类型的数据结构

> 基础数据类型：

> 1.number

> 2.string

> 3.boolean

> 4.null

> 5.undefined

> 引用数据结构

> 1.Object

> 2.Array

其中数组可以以任何类型的值为元素，对象可以以字符串为键，任何类型为值。为什么要提及这个呢，是因为这样的数据结构并不能满足我们所有的需求，所以才有了es6的这些新的数据结构。

#### es6之后

es6新增一种数据类型：Symbol，还有两种数据结构：Set、Map

伴随着他们的还有一个很重要的概念：遍历器，以及一个很重要的操作符：拓展运算符...(这3个点就是运算符)

我们先认识一下这几位之间的关系：（因为这篇主要是理关系，每个概念请查看官方文档）

##### Symbol

###### 特性

symbol是为了标识唯一性，每个symbol都是不一样的，都是唯一的哦，没有任何一个symbol是相等的，牢牢的记住这一点非常的重要。

###### 应用

唯一性的应用场景很多，而它很重要的一点作用是，作为对象的键。

也就是现在对象的键不只有字符串了，也可以是symbol

```javascript
var obj = {
    'string': 'string',
  	[Symbol()]: 'symbol'
}
// 这样你是访问不到Symbol的，为啥，它是唯一的，你都没存人家，也无法再得到它，请问你咋访问啊
// 所以正确的姿势是这样
var symbol = Symbol();
var obj = {
    'string': 'string',
  	[symbol]: 'symbol'
}
console.log(obj[symbol]);
```



##### Set

set类似于数组，但它并不是数组，数组的属性和方法不能用在它上面哦，为什么说它是类似数组的结构，那是因为它也是一个有序的集合。

###### 特性

而且它有一个特别重要的特性是：成员值是唯一的

```javascript
var set = new Set();
set.add(1);
set.add(2);
set.add(1);
console.log(set);//Set(2) {1, 2}，看到没就一个1，重复加没用的
```

set判断唯一性的标准是：严格等于 以及 NaN === NaN;

后面map的判断唯一性也是一样的。

###### Set与Array

Set作为一个构造函数，接受任何具有遍历器接口的数据作为参数来实例化一个set。

也就是数组能通过构造函数转化为set

```javascript
var arr = [1, 2, 4];
var set = new Set(arr);
cosnole.log(set);//Set(3) {1, 2, 4}
```

而set转化为数组有两种方法：Array.from和拓展运算符

```javascript
var set = new Set();
set.add(1);
set.add(2);
set.add(4);

//Array.form
var arr = Array.from(set);
console.log(arr);//[1, 2, 4]

//拓展运算符
var arr = [...set];
console.log(arr);
```

两者的转化，就能互为利用对方的特性来实现一系列的功能，其中最为有用的是：去除数组中重复的值

```javascript
//思路就是先将数组转化为Set，就能去除重复值，然后再转回数组
var arr = [1, 1, 2, 4, 2];

//第一种
Array.from(new Set(arr)); //[1, 2, 4]
//第二种
[...new Set(arr)] //[1, 2, 4]
```

##### Map

map类似于对象，也是一样记住，它不是对象，为什么类似对象，那是因为它是一个无序的集合并且也是键值的形式。

###### 特性

我觉得Map最为有用的是键为值，很奇怪是不是，你没看错，这边得键不再只能是字符串和symbol，而是所有类型都是可以作为键的，我觉得用：值-值，这种形式来描述它真的很准确和形象，我们来看下面的例子：

```javascript
var map = new Map();
map.set(new Object(), 'object');//对象作为键
map.set(document.querySelector('body'), 'body');//dom作为键
map.set(['a'], 1);//数组作为键
console.log(map);//Map(3) {{…} => "object", body => "body", Array(1) => 1}

//我们可以这样来理解上面的结构
map = [{
    key: new Object(), //键也是一个值
  value: 'object'//值
}, {
    key: document.querySelector('body'),
  value: 'body'
}, {
    key: ['a'],
  value: 1
}];
```

我们把上面的形式在转化一下，让它更接近于其定义：

```javascript
//去掉key和value，用数组来表达其形式
map = [
    [new Object(), 'object'],
  	[document.querySelector('body'), 'body'],
  	[['a'], 1]
]
```

###### Map与数组

由上面的形式，其实很容易看出map和数组之间有着很密切的关系，这边有一个概念，Map接受部署了遍历器借口并且其值为双元素的数组的结构作为参数来实例化一个map，有点懵逼是不是，往下看：

条件：

1、具有遍历器接口，这点和set一样

2、值为双元素的数组，也就是你读取的结果得是这样的：['a', 1]，因为我们要的就是这样来添加元素啊，

还记得map的set的方法吗，用这个角度去理解，遍历参数并将其值set进去。

数组转化map

```javascript
var arr = [
    ['a', 1],
  	['b', 2]
];
var map = new Map(arr);
console.log(map); //Map(2) {"a" => 1, "b" => 2}
```

map转化数组：跟Set一样的

```javascript
var map = new Map();
map.set('a', 1);
map.set('b', 2);

//第一种
Array.from(map);
//第二种
[...map];
```

###### Map与对象

map类似对象，那跟对象之间肯定可以相互转化的，但是因为对象没有遍历器接口，我们只能用普通的遍历方法来进行两者之间的转化

```Javascript
//map转化obj
function turnMapToObj(map) {
  	var obj = {};
    for(let [key, value] of map) {
        obj[key] = value
    }
  	return obj;
}

//obj转化map
function turnObjToMap(obj) {
    var map = new Map();
  	for(var key in obj) {
        map.set(key, value);
    }
  	return map;
}
```

##### 遍历器

遍历器itertor的内容很多，之后会再总结。

简略的说一下遍历器和以上数据结构之间的关系：

1、天生拥有遍历器的数据结构：数组、Set、Map和类数组

2、for of调用就是遍历器返回的遍历器对象

3、拓展运算符使用for of遍历数据

4、从3可以知道：数组、Set、Map和类数组都能使用拓展运算符

5、Set和Map，遍历数据用的都是遍历器，并返回遍历器对象，供for of使用

##### 拓展运算符

上面已经看到了拓展运算符的用法了，这边再总结一句是：拓展运算符可认为是将外衣去掉，变成一个个的独立变量，再无法理解，想想利用apply转化参数的方法。

```javascript
...[1, 2, 3] => 1, 2, 3 //只是形象的表示一下，这样的执行时会报错的哦
```

其使用的场景：

1、转化set为array

2、抓化map为array

3、rest参数，就是作为数组承接剩余的参数，可用于arguments和解构，为了不模糊主题就不再展开。



以上，es6加入之后，集合这个数据结构变得更加的丰富了，我们可以通过这些结构的特性，特别是他们之间的相互转化，极大的丰富集合的操作。



