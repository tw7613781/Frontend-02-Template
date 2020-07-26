学习笔记

# 浏览器工作原理

浏览器工作的基本步骤

URL (http) -> HTML (parse) -> DOM (css computing) -> DOM with CSS (layout) -> DOM with Position (render) -> Bitmap

# 有限状态机 (fsm - finite state machine)

这是个编程的一种思想，类似的还有动态规划等。

## fsm在js中的体现 （mealy型的fsm）

- 每一个状态都是一个函数

- 每一个状态返回的是下一个状态

- 循环接受输入

- 直到循环结束，返回最后的状态

下面是fsm处理字符串的例子。s是一个字符串，最开始是进入state0函数处理第一个字符，根据要求，state0可以返回下一个状态，即下一个函数。直到s遍历结束，根据要求state是否停留在end函数。

```
function match (s) {
  let state = state0
  for (const c of s) {
    state = state(c)
  }
  return state === end
}
```

## 两个小技巧

### 不变的状态

当达到某个要求，可以让fsm进入一个不变的状态了，无论输入是什么，返回的都是同一个状态。

```
function end(c) {
  return end
}
```

### reconsume

在返回其他状态的时候，我们想让这个状态也处理下当前输入，我们返回的不是函数，而是函数的call，这个类似递归了

```
function state3(c) {
  if (...) {
    return state4
  } else {
    return state0(c)
  }
}
```

# HTTP （第一步，通过HTTP请求，获得HTML）

winter老师通过编写一个简单的浏览器来带大家理解HTTP协议

## HTTP简介

- HTTP是属于文本型协议，

> 文本型协议对应的是二进制型协议。文本型协议一般是由一串字符组成的数据（当然这个字符串在底层传输的过程中还是要用utf-8编码成字节流,bytes array）,然后通过字符串中间的/r/n等控制符来分割字符串，使得每一部分达到传递有效信息的目的。HTTP协议是常见的文本型协议

> 更多的基础协议是属于二进制型协议。二进制型协议也是用字节流传输的，但是它对于字节流规定的更加严格，通常包括消息头(header)和消息体(body)，消息头的长度固定，并且消息头包括了消息体的长度。这样就能够从数据流中解析出一个完整的二进制数据。

> 可以参考[文本协议与二进制协议](https://blog.csdn.net/u013474436/article/details/70217591)一文

- HTTP协议是一个request和response一一对应的，由浏览器端发送request，由服务器端处理后发回response

- HTTP协议主要是由`\r\n`来区分各个部分的

> `\r`在ascii中是13，carriage return (CR), 含义是把光标移动到行首

> `\n`在sscii中是10，line feed (LF)，含义是换到下一行。在一般的文本编辑器中，回车换行就是这个字符，至少在vscode测试过了。

> `\r\n`组合在一起用的由来是从打字机的时代过来的，打字机换行需要有两个动作，打字到了一行的句尾了，需要首先把光标移回行首，再换到下一行。

### Request格式

第一行request line, 由method path http-version

然后再是request headers

最后是一行空白，接body，body的格式跟Content-Type相关。
```
POST / HTTP/1.1
Host: 127.0.0.1
Content-Type: application/x-www-form-urlencoded

field1=aaa&code=x%D1
```

在vscode中，上面字符串的表示为

```
`POST \ HTTP/1.1\r
Host: 127.0.0.1\r
Content-Type: application/x-www-form-urlencoded\r
\r
field1=aaa&code=x%D1`
```

如果不让vscode中的回车来断行的话，那么表示为

``POST \ HTTP/1.1\r\nHost: 127.0.0.1\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\nfield1=aaa&code=x%D1``

### Response格式

第一行是status line

接下来是headers

然后接一个空行，接body。body的格式是根据header中Transfer-Encoding的值走的。这里以chunked类型为例。chunked的是一个hex的数占一个单行，接着这个hex表示的长度的字符串，以此反复，最后以0为结尾。

```
HTTP/1.1 200 OK
Content-Type: text/html
Date: Mon, 23 Dec 2019 06:46:19 GMT
Connection: keep-alive
Transfer-Encoding: chunked

26
<html><body> Hello World<body></html>
0


```

0后面有一个空行，再接一个空行。

### 用fsm来解析response

已知了resonse的chunked型数据的格式，也知道了这些数据是根据`\r\n`来分离了。可以使用fsm来解析response数据。具体参见toyBrowser->client.js

# HTML的解析 (第二步，通过对HTML的解析获得dom树)

上面通过对http的response的解析，获得了html文件。下面我们还是来运用fsm来解析HTML文件。

在toyBrowser中，我们先完整获得html之后再给htl parser来解析。但是在商用的浏览器中，为了效率，应该做成异步分段获取html，然后对每一段进行解析的。

## HTML的tokenization

在html的标准中，有tokenization这一章，已经定义好了html的所有状态，直接就可以用作fsm。我们toy浏览器选取一些主要的状态来做解析。

> 所谓的状态就是在用fsm来解析字符串的一些特定字符来获得一些特定的内容。比如上面讲的http response的解析，通过`\r\n`等这种特殊字符，我们能得到我们需要的内容。

### 开始简单的三种tag的解析

- 开始标签：比如`<head>`

- 结束标签：比如`</head>`

- 自封闭标签：比如`<img/>`

### 属性添加

- 三种属性值的写法，有单引号，双引号，无引号。

## 构建dom树

- 栈和树有天然的对应关系

- 从标签构建dom树的基本技巧是使用栈

- 遇到开始标签时创建元素并入栈，遇到结束标签时出栈

- 自封闭节点可视为入栈后立即出栈

- 任务元素的父元素是它入栈前的栈顶

- 文本节点于自封闭标签处理类似，不需要入栈，但是需要合并


