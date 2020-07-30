学习笔记

# 运算符和表达式 **Grammar -> Syntax**

## Reference Type **Runtime -> 内部类型**

用对象的点运算符，比如a.b，取出来之后的不是对象的属性的值，而是对于属性的值的引用（reference）。它不是其中基本类型之一，但是也是实实在在存在于runtime的类型，被称之为标准类型，也不是语言类型。

reference由两部分组成，object和key（可以是string，也可以是symbol）

delete操作的时候：比如 `delete a.b`，就完整的用到了reference的这个特征，明确的知道了删除哪个对象的哪个属性。

assign操作的时候也是一样：比如`a.b = 4`

## 运算符的优先级

### 语法树

运算符的优先级是在解析源码的时候由语法树来实现的，更高优先级的运算符和表达式处于子节点的位置。比如`1+2*3`的语法树是

```
   +
  1  *
    2  3
```

### 优先级 （从高到低）

- member和new

  - a.b 成员访问

  - a[b] 成员访问，如果b是字符串的话

  - new Foo()

  - ...

- call

  - foo() 典型的函数调用

  - foo().b 加上点运算符之后，把点运算符降级了，从member降级到了call，所以还是从左到右执行。
 
**left handside & right handside**

下面的都是right handside的表达式和运算符

- update

  - a++

  - ++a

- unary 单目运算符

  - delete a.b

  - void foo() 返回undefined

  - typeof a

  - ...

- exponental

  - ** 指数运算符

  - 3\**2\**3 它是右结合的，先2的3次方，再3的8次方

- multiplicative

- additive

- shift

  - \>>, \<<, \>>>

- relationship

- equality

- bitwise

- logical

  - &&

  - ||

- conditional

  - ?:

  最后两个运算符都有短路原则，即满足条件后就不会计算另外的表达式了。比如&&运算符，如果第一个表达式为false了，那么整个表达式已经是false了，不需要运行第二个表达式饿了。||运算符则是如果第一个表达式为true了，那么第二个表达式也不会被运算了。

## 类型转换

7种基本类型之间可以互相转换（个别不可以），或者在使用`==`比较两个变量的时候，如果这两个变量的类型不同的话，会涉及到隐形的类型转换。因为隐形转换的规则太复杂，尽量避免使用。
 
> 关于`==`的话，建议两边的类型相同再比较或者使用`===`符合好判断两边是否相等。

这里比较难理解的是其他类型和Obeject类型的互相转换

### Obejct to 其他类型（unboxing，拆箱转换）

在Object中，如果存在`[Symbol.toPrimitive]()`方法，在类型转换的时候直接调用它

不然的话，如果是在转Number类型的话，如果存在`valueOf()`方法，先调用它

不然的话，如果是在转String类型的话，如果存在`toString()`方法，先调用它

下面是Object隐形转Number的过程。它有两个方法，一个是valueOf(),一个是toString(),它先调用valueOf，因为它返回的是个空对象{}，所以转换失败。接着再调用toString()，返回的也是空对象，所以最后出现了TypeError的错误，意味着转换失败。如果我们把valueOf()函数的返回值改为1，那么`o * 2 `的结果就是1。

```
var o = { 
  valueOf : () => {console.log("valueOf"); return {}}, 
  toString : () => {console.log("toString"); return {}} 
} 

o * 2 

// valueOf 
// toString 
// TypeError
```

同理，关于Object转String的例子也是一样

```
var o = { 
  valueOf : () => {console.log("valueOf"); return {}}, 
  toString : () => {console.log("toString"); return {}} 
} 
  
String(o) 

// toString 
// valueOf 
// TypeError
```

最后，关于`[Symbol.toPrimitive]()`方法的例子

```
var o = { 
  valueOf : () => {console.log("valueOf"); return {}}, 
  toString : () => {console.log("toString"); return {}} 
} 

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"} 

console.log(o + "") 

// toPrimitive // hello
```

### 其他类型 to Object（boxing，装箱转换）

Number、String、Boolean、Symbol 在对象中都有对应的类，所谓装箱转换，正是把基本类型转换为对应的对象

- Number -> new Number(1) 

- String -> new String('a')

- Boolean -> new Boolean(true)

- Symbol -> new Object(Symbol('a')) ：这个比较特殊，具体原因待查

# 语句 **Grammar -> Syntax**

从运算符到表达式，语句是更高一层的语法结构。主要由简单语句，组合语句，声明构成，同时带出了个Runtime的数据类型,**Completion Record**

## Completion Record **Runtime -> 内部类型**

跟上面的reference数据结构一样，它也是在运行时存在的一种数据结构。

记录了语句执行的结果，需要注意的是我们没有办法把completion record赋值给变量，但是它确确实实存在于运行时。它是实现语句控制的基础。

它的大致结构如下

- [[type]]: normal, break, continue, return, or throw

- [[value]]: 基本类型

- [[target]]: label

下面结合语句再具体说明它

## 简单语句

就是里面不会包含其他语句的语句。有expression statement, empty statement, debugger statement, throw statement, continue statement, break statement, return statement。

## 复合语句

主要是一些控制语句。包括

- block statement： 由一对花括号包括的语句列表组成

  - [[type]]: normal

  - [[value]]: --

  - [[target]]: --

- if statement

- switch statement: 建议不用，没有像c语言中switch的性能提高，可以被`if-else-if`代替

- iteration statement
  
  - while

  - do...while

  - for(;;)

  - for..in..

  - for..of..

- with statement

- labelled statement: 这个平时用得少，主要用在iteration, break, continue的这些情况中。比如

```
let str = '';

loop1:
for (let i = 0; i < 5; i++) {
  if (i === 1) {
    continue loop1;
  }
  str = str + i;
}

console.log(str);
// expected output: "0234"
```

这里的loop1就是label，在简单的循环中可能会显得有点多余，但是如果循环复杂了，使用标签可以精准控制循环。

- try statement：这里有趣的是即使在try或者catch中return了，也会执行finally中的语句。

## 声明

### ES3风格的声明

主要的关键字有function, function*, async function, async function*, var

**function\* 是定义一个生成器函数(generator function)，返回一个Generator对象**

### ES6之后风格的声明

主要的关键字有class, const, let

### 区别

最大的区别在于作用域的不同，在预处理的时候会触发。

- var， function等

它的作用域是所在的函数体，声明没有先后关系，永远被当作函数的第一行处理。

比如var，即使在return后声明，也会有效

```
var a = 2;
void function (){
  a = 1; 
  return; 
  var a;
}(); 
console.log(a);
//结果是2
```

- let, const, class

作用域是它所在的花括号。同时如果在声明之前使用的话，会抛出错误。

```
var a = 2;
void function (){
  a = 1; 
  return; 
  const a;
}(); 
console.log(a);
// 抛出错误
```

# 结构structure **Grammar -> Syntax**

这一节介绍了运行时的宏任务(job)，微任务(promise)，函数调用(exection context)等在语句之上更大的结构。

## 宏任务和微任务

通过看重学前端专题总结了下

宏任务，微任务都是针对于js engine说的，得执行js代码，就需要js引擎，其中比较著名的js engine就是chrome的v8 engine。

那宏任务和微任务的区别是，宏任务是宿主环境传递给js engine的代码。而微任务是js engine自己发起的任务，这里一般讲的是promise。

那么js engine一般的执行模式是一个单线程的event loop。用伪代码写就是这样

```
while(TRUE) { 
  r = wait(); 
  execute(r);
}
```

js代码的执行顺序一直是js代码面试的最爱，我们通过宏任务，微任务来给定js的执行顺序

首先，先分同步任务和异步任务，同步任务从上到下先执行完毕。

再看异步任务，除了promise之外的异步任务都是宏任务，promise的任务是微任务。

事件队列是这样的，先执行同步任务，再执行异步任务，然后每一个宏任务（同步也好，异步也好）包括了一个微任务队列，而微任务队列不执行完毕，是不会进入下一个宏任务的。

举例子

```
1   var r = new Promise(function(resolve, reject){ 
      console.log("a"); 
      resolve() 
    }); 
2   r.then(() => console.log("c")); 
3   console.log("b")
```

1号语句是一个promise的初始化之后的赋值语句，是同步执行的，它是个宏任务，2号语句是第一句宏任务发起的微任务，说明了promise的被fulfill之后的行为。3号语句还是个同步任务。

所以执行的结果是abc了

第二个例子

```
1   var r = new Promise(function(resolve, reject){ 
      console.log("a"); 
      resolve() 
    }); 
2   setTimeout(()=>console.log("d"), 0) 
3   r.then(() => console.log("c")); 
4   console.log("b")
```

这里加了一个setTimeout()函数。其他的部分都是一样的，所以a和b先被执行输出。那么3号语句是1号宏任务的微任务，而2号语句是一个异步的宏任务，所以3号语句先执行，2号语句再执行，输出结果是abcd。

然后我们弄一个极端的例子

```
1   setTimeout(()=>console.log("d"), 0) 
2   var r = new Promise(function(resolve, reject){ 
      resolve() 
    }); 
3   r.then(() => { 
      var begin = Date.now(); 
      while(Date.now() - begin < 1000); 
      console.log("c1") 
      new Promise(function(resolve, reject){ 
        resolve() 
      }).then(() => console.log("c2")) 
    });
```

1号语句是个异步宏任务，咱得先看同步语句有没有。2号语句就是同步语句，那么2号语句先执行。而3号语句是2号语句发起的微任务。所以即使3号语句里面有个耗时一秒的死循环，同时它本身还发起了一个微任务，也得那先执行完成，再执行早就触发了时间的1号任务。

## 函数调用

在介绍函数调用之前，先介绍一个概念，闭包

### 闭包 (closure)

闭包由两部分组成，古典定义是

- 环境部分

  - 环境
  
  - 标识符列表

- 表达式部分

那么放在js中，对应的就是

- 环境部分

  - 环境：函数的词法环境（执行上下文的一部分）
  
  - 标识符列表：函数中用到的未声明的变量
  
- 表达式部分：函数体

闭包例子

f3,f4都是闭包，因为它依赖于外部环境，变量a。

```
let f2 = a => {
  let f3 = x => a + x
  let f4 = x => a*2 + x
  return [f3,f4]
}

```

### 执行上下文 (execution context)

- lexical environment：词法环境，当获取变量或者 this 值时使用。

包括this, new.target, super, 变量等

- variable environment：变量环境，当声明变量时使用。

是个历史遗留的包袱，仅仅用于处理var声明

- code evaluation state：用于恢复代码执行位置。

- Function：执行的任务是函数时使用，表示正在被执行的函数。

- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码。

- Realm：使用的基础库和内置对象实例。

在js中，函数表达式和对象直接量均会创建对象，隐式转换也会创建对象。这些对象也是有原型的，如果我们没有realm，就不知道它的原型是什么了。

```
var x = {};// Object
1 .toString();//   Number
```

- Generator：仅生成器上下文有这个属性，表示当前生成器