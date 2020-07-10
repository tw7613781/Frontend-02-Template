学习笔记

# 编程语言基本知识

winter从一个很宏观的角度开始介绍JS，即编程语言是什么，从语言学，到数学，最后落脚到编程语言到JS.

## 形式语言 （乔姆斯基谱系）

- 0型 无限制文法

- 1型 上下文相关文法: 意思是某个相同的标识符是否因为上下文的不同而产生不同的含义

- 2型 上下文无关文法: 

- 3型 正则文法

JS处于大体上为**2型**，但是有个别语法会跟上下文相关，但是在归类的时候忽略了。比如符号“`/`”可以是除号，也可以是正则表达式的开始根据上下文的不同。

## 产生式（BNF）

一种数学表示法来表达形式语言

比如表示一个四则运算

```
<MultiplicativeExpression>::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>
```

怎么解读这个定义呢

1. 从上到下开始阅读，首先`<Number>`是这里的最小的定义单位，叫做终结符

2. `<MultiplicativeExpression>`是从`<Number>`得来的，叫做非终结符

3. 意思是乘法表达式可以是一个数字，或者是乘法表达式乘以一个数字，或者是乘法表达式除以一个数字。这里用了大量的递归定义

4. 那么加法表达式又是基于乘法表达式，它可以是乘法表达式，或是是加法表达式加上或者减去一个乘法表达式。

所以从这里来看，数学语言表达的就是完备和准确，虽然读起来那么的反人性。

- 扩展，带括号的四则运算产生式

```
<MultiplicativeExpression>::=<Number>|
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>｜
    <AddtiveExpression>"-"<MultiplicativeExpression>
      
<ParenthesisExpression>::=<AddtiveExpression>|
    "("<ParenthesisExpression>")""+""("<AddtiveExpression>"|
    "("<ParenthesisExpression>")""-""("<AddtiveExpression>"|
    "("<ParenthesisExpression>")""*""("<AddtiveExpression>"|
    "("<ParenthesisExpression>")""/""("<AddtiveExpression>"
```

- 注：因为还没有批改，不确定对错，作业批改之后再修正。

## 形式语言的分类

### 用途的不同

- 数据描述语言: JSON, HTML, XAML, SQL, CSS ...

- 编程语言: C/C++/C#, Java, Python, Ruby, Perl, Lisp, Haskell, Javascript ...

### 表达方式

- 声明式语言: JSON, HTML, CSS, SQL, Lisp, Haskell...

- 命令型语言: C/C++/C#, Java, Python, Ruby, Perl, Javascript ...

## 动态和静态

### 动态

- 在用户的设备/在线服务器上

- 产品实际运行时

- Runtime

### 静态：

- 在程序员的设备上

- 产品开发时

- Compiletime

## 类型系统

### 动态类型系统与静态类型系统

这里winter举的例子很好。之前一直不理解。

- 动态类型系统对应到上面的动态定义中，就是运行的时候，程序的类型跟我编程的时候是一样的，程序保留了源代码和类型。

- 静态类型系统对应了上面的静态定义中，就是运行的时候，程序经过编译后，程序已经没有了编程的时候的类型信息了。所以在一些新的静态语言中，比如golang和rust中，才有反射这种概念，能够获取到程序运行时的类型。

### 强类型与弱类型

- 是否会自动转化

### 等等

## 重学JavaScript的重点

语法 ==》 （语义） ==》 运行时

**从coding时候的语法到runtime时候JS系统又是怎样**来学习JS

# JS的类型系统

winter从下面7个JS的基本类型开始讲起

- Number

- String

- Boolean

- Object

- Null

- Undefined

- Symbol

## Number

### Number的二进制表示方式

在JS中，一个Number的表示是用64bit的double float来表示的。表示的方法跟科学记数法类似 ==> m × 10^n

其中，1bit符号位，11bit表示指数n，52bit表示m，有效数字

m的范围是[1,2)，所以那个1就省略了，52bit表示的都是小数点后面的数字。

### Number字面量

有些特殊的

- 0

可以带小数点，在使用`toString()`方法时候，要这样`0 .toString()`，注意这个空格

- 2.

- .2

科学记数法

- 1e3

二进制

- 0b111

八进制

- 0o10

十六进制

- 0xFF

### Number使用的注意事项

#### 0.1 + 0.2 ！== 0.3的问题

由于浮点运算的精度问题的特点，导致等式左右的结果并不是严格相等，而是相差了个微小的值。正确的比较方法是使用 JavaScript 提供的最小精度值：

```
console.log(Math.abs(0.1+0.2-0.3)<=Number.EPSILON)
```

检查等式左右两边差的绝对值是否小于最小精度，才是正确的比较浮点数的方法。这段代码结果就是 true 了。

#### 最大的能够准确表示的整体

根据双精度浮点数的定义，Number 类型中有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，所以 Number 无法精确表示此范围外的整数

```
Number.MAX_SAFE_INTEGER.toString(16)
// 1fffffffffffff
```

#### 实际应用

由于这个特点，使得JS在处理大叔或者小数的时候，精度是不能够信赖的。可以使用一些第三方库来解决这个问题。

比如：

decimal库

```
const Decimal = require('decimal.js')
```

bignumber库

```
const BigNumber = require('bignumber.js');
```
