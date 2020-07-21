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