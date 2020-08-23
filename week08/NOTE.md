学习笔记

# 8. 重学HTML,浏览器API

## 8.1 HTML的定义

SGML -> XML -> HTML -> HTML5

在DTD中定义了HTML

- http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd 

- http://www.w3.org/1999/xhtml

特别介绍了`&nbsp;`来控制空格的例子是以破坏语义的方式来实现一定的功能。建议使用css的white-space来控制空格

## 8.2 HTML标签语义

这一节很精彩。winter用html标签已语义化的形式重新手写了一个wiki的页面。

现在大多数的页面都是使用div和span标签来写。所以通过这么个页面来重新学习下html的语义。所谓的语义系统，就是首先关心的是语义表达是否正确，再关注它表现的部分（这部分用css控制）

## 8.3 HTML语法

### 合法元素

- Element: `<tagname>...</tagname>`

- Text: `text`

- Comment: `<!-- comments -->`

- DocumentType: `<!DocTyle html>`

在html5中就这一种doc tyle

- ProcessingInstruction: `<?a 1?>`

- CDATA: `<![CDATA[ ]]>`

这两种用的很少

### 字符引用

- `&#161;`

数字字符，`&#`开头的接ascii值，以`;`结尾

- `&amp;`：`&`

- `&lt;`：`<`

- `&quot;`：`"`

实体字符，`&`开头的接实体变量，以`;`结尾

## 8.4 ~8.6 浏览器API｜DOM API

DOM API是最重要的一类浏览器API，占到百分之七八十

DOM API是HTML的对象化

DOM API分下面4类

- 节点类

能挂在dom上的都叫node，有一个node类

  - Node

    - Element：元素型节点，跟标签相对应

      - HTMLElement

        - HTMLAnchorElement, HTMLAppleElement, HTMLAreaElement, HTMLAudioElement, HTMLBodyElement, ...

      - SVGElement

        - SVGAElement, SVGAltGlyphElement, ...

    - Document：文档根节点

    - CharacterData

      - Text：文本节点

      - Comments：注释

      - ProcessingInstruction：处理信息

    - DocumentFragment：文档片段

    - DocumentType：文档类型

  - 重要的操作

    - 导航类操作

      - 节点类：parentNode, childNodes, firsChild, lastChild, nextSibling, previousSibling（因为回车等也会形成节点，所以根据节点去导航，一般很容易就碰到回车等）

      - 元素类：parentElement, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling（一般使用元素类api去导航）
    
    - 修改操作

      - appendChild

      - insertBefore

      - removeChild

      - replaceChild

    - 高级操作

      - compareDocumentPosition：是一个用于比较两个节点中关系的函数

      - contains：检查一个节点是否包含另一个节点的函数

      - isEqualNode：检查两个节点是否完全相同

      - isSameNode：检查两个节点是否是同一个节点，实际上在js中可以用`===`

      - cloneNode：复制一个节点，如果传入参数true，则会连同子元素做深拷贝。

- 事件类

  - 介绍了addEventListerner函数。它能将指定的监听器注册到 EventTarget 上，当该对象触发指定的事件时，指定的回调函数就会被执行。 EventTarget可以是一个文档上的元素 Element,Document和Window或者任何其他支持事件的对象 (比如 XMLHttpRequest)。

  - target.addEventListener(type, listener, options);

  - 第三个参数的options中可以有

    - capture：是在捕获阶段触发还是在冒泡阶段触发。捕获阶段是从外到内一层层计算事件发生在哪个元素上，冒泡是我们已经算到了事件发生在哪个元素，层层的往外去触发元素的监听函数的过程。默认的是冒泡的监听。

    - once：listener回调函数只触发一次

    - passive：当在处理touchmove或scroll等事件时，设为true，提升性能。

![冒泡与捕获](../resource/eventflow.svg)

- range api：比节点类的api更精确的操作dom树，性能也更好，但是用起来很麻烦。它本质上是dom树的一段。有起点有终点，然后还可以把这一段从dom树上摘下来，形成fragment。fragment可能理解为不在dom树的一段dom元素，dom树有的api它基本都有。

  - 面试题：把一个元素的所有子元素逆序。参看reverseChildren.html和reverseChildren1.html

  - 重要的api

    - var range = new Range()

    - range.selectNodeContents()

    - var fragment = range.extractContents()

  - 写框架的时候，对dom树的操作有高性能要求，就会用到fragment和range这一对好朋友。使用range把所需的nodes都摘下来，然后在fragment操作，最后再批量append挂上去。

- traversal api：基本废了

## 8.7 浏览器API->CSSOM API

对CSS的抽象也就是CSSOM了。好处是可以批量修改css规则，然后伪元素的风格必须使用cssom来操作

cssom也都是要从dom api中开始的，从document.styleSheets属性开始

重要的api

- 返回第一个style文件的所有css规则：`document.styleSheets[0].cssRules`

- 插入一条css规则：`document.styleSheets[0].insertRule("p {color:pink;}", 0)`

- 删除一条css规则：`document.styleSheets[0].removeRule(0)`

css普通规则对象: CSSStyleRule

- selectorText Sring

- style K-V结构

还有个重要的功能是`window.getComputedStyle(elt, pseudoElt)`

- elt是要到获取的元素

- pseudoElt 可选，伪元素

它能获取到某个元素或者伪元素最终计算出来的样式。

## 8.8 浏览器API->CSSOM View API

cssom view部分的api是对浏览器layout后，render后形成的一些属性的操作

- window

  - window.innerHeight, window.innerWidth：viewport的高宽，也就是html内容实际被渲染的区域

  - window.outerWidth, window.outerHeight：不太有用，包含浏览器的工具栏，inspector等占的空间

  - window.devicePixelRatio：屏幕上的物理像素跟代码中的逻辑像素px的比值。正常设备是1:1，retina屏幕是1:2.

  - window.screen：不太需要关注。

    - window.screen.width

    - window.screen.height

    - window.screen.availWidth

    - window.screen.availHeight

  - window.open("about:blank", "_blank", "width=100,height=100,left=100,right=100")：常用来弹出小广告

- scroll：有滚动条的时候会生效

- layout相关的api，去获取我们浏览器layout之后的元素的位置。是元素上的api，得到元素生成的盒。附着元素的伪元素生成的盒也会被返回。

  - getClientRects()

  - getBoundingClientRect()

## 8.9 浏览器API->其他API

API的来源，也就是标准是谁定的

- khronos -> WebGL

- ECMA -> ECMAScript

- WHATWG -> HTML

- W3C -> webaudio, CG/WG

通过对window对象使用`Object.getOwnPropertyName(window)`方法获取到所有的api，然后进行分类。




