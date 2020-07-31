学习笔记

# CSS Computing

本节的重点是从dom树生成带css属性的dom树

## 收集css规则

这里调用了一个外部包，名字叫做**css**来处理对css标签的词法和语法分析。

> 所谓词法分析（lexical analysis），语法分析都是对源代码进行编译的步骤。第一步是词法分析，就是从字符串里面找出来符合语音定义的单词(也称单词符号或符号，如标识符、常数、运算符、定界符等)，英语叫做token，这个过程也叫tokenization。

> 语法分析（parsing）是根据语言的形式文法(formal grammar)对输入的单词(token)序列进行分析并确定其语法结构的一种过程。输出一般是一颗抽象语法树。

调用的这个**css**库产生的css的ast树的结构是这样的

- 主要有两个属性，一个是type，值就是stylesheet了。一个是stylesheet属性，值就是具体的stylesheet的内容了

- 在stylesheet中，主要的属性是rules，这个就是css的每一条规则了，是我们需要保持到全局变量rules中的内容，也是后续处理的对象了。

- 在rules中，主要有两个属性，一个是selectors，一个是declarations。selectors里面就是一条规则的选择器，declarations中就是选择器后面花括号的值了，以k-v形式保存。

> 另外有个小语法是`...数组`，把数组的每个元素都取出来。

```
// arr.push([element1[, ...[, elementN]]])
rules.push(...ast.stylesheet.rules)

// 如果没有使用...操作符的话，就直接把一个array push进去进去当一个element了。
```

## 添加调用

这里强调的是计算css的时机，在body中遇到startTag的时候就开始计算css的。

因为是玩具浏览器，它做了很多假设，忽略了很多场景。比如style就默认都写在head中了。

## 获取父元素序列

在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配。这是由选择器的特性决定的。

我们可以从stack中获取到当前元素的所有父元素

> 小语法，array的直接赋值和deep copy

我们知道js中的对象直接赋值的话都是引用赋值，就是当前对象的值改变了，引用赋值也会变化，因为它们指向同样的对象地址。可以用slice()函数来重新返回一个一样的数组来解决这个问题。

这里由个小问题，就是在mozilla的js文档中，slice()返回的被称为shallow copy,它的效果跟我们理解中的这种deep copy是一样的，但是为什么叫做shallow copy，这里值得溯源考古一下。

> The slice() method returns a **shallow copy** of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

```
let a = [1,2,3,4]

b = a

c = a.slice()

a.push(5)

// a = [1,2,3,4,5]
// b = [1,2,3,4,5]
// c = [1,2,3,4]
```