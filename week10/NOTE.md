学习笔记

# 1. 使用LL算法构建AST

ast叫做抽象语法树

在编译过程中，是从词法分析（从字符串中得到token）到语法分析（构建ast树），然后再基于ast树进行下一步的解析。

构建ast有ll算法和lr算法。ll是left的意思，就是从左到右扫描，从左到右规约

## 1.1 四则运算

### 1.1.1 token（词法分析）

- token number：0123456789的组合

- operator：+，-，*，/

- whitespace：`<sp>`，line terminator：`<lf><cr>`：可以忽略

### 1.1.2 产生式（语法分析）

四则运算最小的单元是乘法

```
 <MultiplicativeExpression>::=
  <Number>
  |<MultiplicativeExpression><*><Number>
  |<MultiplicativeExpression></><Number>
```

接着从乘法的表达衍生出加法

```
 <AdditiveExpression>::=
  <MultiplicativeExpression>
  |<AdditiveExpression><+><MultiplicativeExpression>
  |<AdditiveExpression><-><MultiplicativeExpression>
```

最后再加上终结符形成一个完整的表达式

```
 <Expression>::=
  <AdditiveExpression><EOF>
```

### 1.1.3 正则表达式

在正则表达式中，圆括号表示捕获。配合regexp.exec使用，循环捕获目标字符串。通过这样的方式完成了词法分析。

### 1.1.4 ll算法

利用递归的方式，严格参照产生式的定义，生成一个单跟的语法树

# 2 字符串分析算法

- 字典树：大量高重复字符串的存储与分析

- kmp：在长字符串里面找模式

- wildcard：带通配符的字符串模式

- 正则：字符串通用模式匹配

- 状态机：通用的字符串分析

- ll，lr：字符串多层级结构分析

# 2.1 字典树，trie

使用场景：可以去求出现最多的次数，字典树最小，字典树最大等值

# 2.2 kmp

kmp是个模式匹配的算法。即一个字符串里面有没有另外一个字符串。

暴力解的时间复杂度是m*n，即从原串的每一个字符为开头去匹配pattern串。

kmp算法呢就是把时间复杂度降为m+n的有名算法。

kmp算法的核心是要关注pattern串的自重复现象

- 求pattern串的跳转表格

- 进行真正的匹配

# 2.3 wildcard

在pattern中包括了`*`号，`?`号

`*`号：是零个或多个任意字符

有多个星号的情况下，前面的星号尽可能的少匹配，最后的星号尽可能的多匹配。

`?`号：是一个任意字符

去掉`?`号考虑的话，一个wildcard就是若干个kmp来组成的这样一个格式。

正则的exec也可以帮助我们在一个字符串里面找特定的pattern

