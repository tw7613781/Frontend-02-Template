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

## 选择器与元素的匹配

因为已经获得到了当前元素的父元素array和所有的css rules的array，那现在的基本思路就是看当前元素的父元素array能够匹配到哪个css rule了。一个双array的匹配算法。

css选择器实际上也比较多内容，我对这一块不熟悉，之后看重学css的时候再补上。

这里玩具浏览器做了css选择器的简化，就只有一个复杂选择器，它包括了由空格隔开的简单选择器，简单选择器主要是三种

- .a 

class选择器

- #a

id选择器

- div

元素选择器

## 匹配

针对上面三种情况，实际匹配元素与选择器

## 匹配成功的css属性应用到元素上

把css rule中的declaration中的值每一条作用在元素上

## 选择器的优先级

选择器的优先级，在英语中叫做specificity,不是priority。

优先级是这么定义的

一个规则中，inline > id > class > tagName

所以设计了一个数组，保存了一个复杂选择器中的四种简单选择器出现的次数，[0,0,0,0],从左边开始比较，越左边的权重越大。

比如

body div #myid

是1个id选择器，2个元素选择器，那么数组是[0,1,0,2]

body div img

是3个元素选择器，那么数组是[0,0,0,3]

那这两个比较的话，在左边第二位的时候，1 > 0，那么第一个复杂选择器的优先级高。如果是同一个元素匹配到这两条规则的话，优先级高的会覆盖优先级低的。

# 排版或者布局 (layout)

目的是把带有css的dom树变成带有位置（position）的dom树

## 根据浏览器属性进行排版

排版的基础知识

css排版技术大致分为四代技术

- 正常流。根据position, display, float属性去排版，属于古典的排版策略

- flex。区别主轴方向（main axis）和交叉轴方向（cross axis）。它们的区别就是当新的元素进来的时候排版自然延伸的方向是沿着主轴方向进行的。

- grid

- css houdini

玩具浏览器采用flex排版方式

如果主轴方向是row的话，就是主轴方向是水平的，从左到右，或者从右到左

- main: widht x left right

- cross: height y top bottom

如果主轴方向是column的话，那么主轴方向就是从上到下，或者从下到上的

- main: height y top bottom

- cross: width x left right

我们这一步进行一个预处理，即一些具体属性的抽象，把width, height, left, right, top, bottom等属性抽象到符合flex排版的main, cross等属性。之后的工作就不用大段的if-else语言来判断不同的主轴对应的具体属性应该在哪里了。

## 收集元素进行（hang）

在排版当前元素的时候，要把它的所有子元素都放到所谓的行里面

那分行的基本算法是

- 根据主轴尺寸，把元素分进行。追加当前元素到当前行时，若超过最大行长度，另新建一行。

- 若设置了no-wrap，则强行分配进入第一行

## 计算主轴

找出当前flex属性的元素

把主轴方向的剩余尺寸按比例分配给这些元素

若剩余空间为负数，所有flex元素为0， 等比压缩剩余元素

## 计算交叉轴

根据每一行中最大元素尺寸计算行高

根据行高flex-align和item-align，去定元素具体位置

# 渲染(render)

## 渲染dom树中单个元素

- 绘制需要依赖一个图形环境：这里用了npm包images

- 绘制在一个viewport上进行

- 与绘制相关的属性：background-color, border, background-image等

## 渲染整个dom树

- 递归调用子元素的绘制方法完成dom树的绘制

- 做了大量的忽略

# 总结

最后虽然输出了与winter视频中一样的结果，但是我在一些代码中做了省略，特别是计算layout部分中的crossSize，也就是height的值。

理解了浏览器的主要工作步骤和大致原理，对于有限状态机有了初步的认识。

之后还需要对细节进一步的深究