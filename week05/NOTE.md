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