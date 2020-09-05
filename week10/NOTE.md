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


