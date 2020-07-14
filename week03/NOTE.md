学习笔记

# 运算符和表达式 **Grammar -> Syntax**

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

