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

## 8.4 浏览器API｜DOM API

DOM API是最重要的一类浏览器API，占到百分之七八十

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

- range api：比节点类的api更精确的操作dom树，性能也更好，但是用起来很麻烦

- traversal api：基本废了


