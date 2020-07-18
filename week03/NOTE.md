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


