### ES6学习之let和const

es6正式推出已经1年多了，居然还没学过，简直不能再羞耻了。买来的书都已经积灰，太对不起阮大神了。今天痛改前非，赶紧将es6捡起来。	

es6的学习笔记也会整理成一个系列，督促自己总结思考。

#### 变量提升

js有一个难点叫做“变量提升”，在es6之前，js的作用域分为两种，一是全局作用域，二是函数作用域，变量提升的就是变量的声明，无论在作用域的什么位置，都会被提升到作用域的最顶端，

<!--more--> 

举个例子：

```javascript
console.log(x); //undefined
var x = 1;
console.log(); //1
```

看第一个console，变量x在还没执行var x = 1之前被访问输出了undefined，也就是说x是被声明了，只是它是一个空值，这就是变量提升的现象导致的。

变量的生命周期可以这样做一个总结：

1、被创建：这个时候访问会报错Uncaught ReferenceError: x is not defined

2、被初始化：访问显示undefined

3、被赋值

5、被销毁

由此来看所谓变量提升，意思是变量的创建和初始化被提升到了作用域的顶端。

所以，上面例子可以等同于：

```Javascript
var x = undefined;
console.log(x); //undefined
x = 1;
console.log(x);//1
```

而这样的机制引发的问题也是很明显的：

1、内层变量会覆盖外层变量

```javascript
var x = 123;
var f = function() {
    console.log(x);
  	if(false) {
        var x = 'abc';
    }
}
f()//undefined,因为在f内部又被定义了一次，重置成了undefined了
```

2、用来计数的变量泄露为全局变量

```javascript
var s = "hello";
for(var i = 0; i < s.length; i++) {
    console.log(s[i]);
}
console.log(i);//5，i声明被提升，导致其成为全局变量
```



#### 块级作用域

es6的出现，带来了一个新的概念：块级作用域。

块级作用域是由const和let体现的。

块级作用域有几个特点：

1、不存在变量提升

2、存在暂时性死区

3、不允许重复声明

4、块级作用域可嵌套

> var还是原来的作用域结构，只有let和const才有块级作用域的概念。

##### 不存在变量提升

变量提升的概念上面讲过，就是创建和初始化被提升到作用域顶部，而块级作用域底下，变量只有创建这个过程被提升，而初始化是在代码出现的那个位置。

```javascript
console.log(x);//Uncaught ReferenceError: x is not defined
let x;
console.log(x); //undefined
x = 1;
console.log(x);//1
```

这边我们可以看到var非常不同的一点就是第一次console报错了，x没有被初始化，所以它是不可访问的。只有在声明的这句代码出现的时候才会被初始化，也就是第二个console打印出undefined。

##### 存在暂时性死区

当你在一个块内声明了块级作用域的变量，那这个变量就绑定了这个区域，不再受外部声明的影响。

```javascript
var x = 123;
if(true) {
    x = 'abc'; //Uncaught ReferenceError: x is not defined
  	let x;
}
```

这边报错的原因就在于这句let x; 因为这句的存在，这if里面形成了块级作用域，x便被绑定到这个作用域里，这个时候在还没被初始化之前被访问，也就报错了。虽然在最外面有一个var x = 123;但它并不影响内部的块级作用域。

es6明确规定，如果区块中存在let和const命令，则这个区块对这个命令声明的变量从一开始就形成封闭作用域。只要在声明之前就使用这些变量，就会报错。

所以，在块级作用域内，变量声明的那句代码未出现之前，这个变量是不可用的。这在语法上称为“暂时性死区”(TDZ)。

```javascript
if(true) {
    //TDZ开始
  	x = 'abc';//Uncaught ReferenceError: x is not defined
  	console.log(x);//Uncaught ReferenceError: x is not defined
  	
  	let x; //TDZ结束
  	console.log(x); //undefined
  	
  	x = 123;
  	console.log(x); //123
}
```

暂时性死区的本质就是，当进入一个作用域内，所要使用的变量就已经被创建，但是处于不可使用状态，直到试行到声明代码的那一行代码，才可以获取和使用该变量。

##### 不允许重复声明

在块级作用域内，不允许重复声明同一个变量。

```javascript
let a = 10;
var a = 1; //Uncaught SyntaxError: Identifier 'a' has already been declared
```

##### 块级作用域可嵌套

块级作用域下：外层代码块不受内层代码块的影响，外层代码块无法读取内层代码块的变量，内层代码块的变量声明也不会受外层代码的影响。

```javascript
var f1 = function(){
    let n = 5;
  	if(true) {
      	let n = 10;
      	let b = 1;
  	}
  	console.log(n); //5
  	console.log(b); //报错
}
```

##### 函数

ES6规定，函数本身的作用域在其所在的块级作用域之内，其实也就和let和const一样的道理。

>而要注意es5中函数声明也是存在函数提升的。

#### const和let的区别

const是声明常量的，它必须有初始值，声明后就不能再赋值。

let是声明变量的，它不需要初始值，可以重复赋值。



#### 参考文章

1、[我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)

2、[ES6 标准入门] 阮一峰 著