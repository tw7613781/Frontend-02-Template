const EOF = Symbol('EOF')

function data (c) {
  if (c === '<') {
    return tagOpen
  } else if (c === EOF) {

  } else {
    // 一些没实现的状态，吃掉这些字符
    return data
  }
}

function tagOpen (c) {
  if (c === '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z]$/)) {
    // reconsuming
    return tagName(c)
  } else {

  }
}

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z]$/)) {
    return tagName(c)
  } else if (c === '>') {
    // error handler
  } else if (c === EOF) {
    // error handler
  } else {

  }
}

function tagName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    // 标签的属性部分
    return beforeAttributeName
  } else if (c === '/') {
    return selfClosingStartTag
  } else if (c.match(/^[a-zA-Z]$/)) {
    return tagName
  } else if (c === '>') {
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c === '>') {
    return data
  } else if (c === '=') {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}

function selfClosingStartTag (c) {
  if (c === '>') {
    // currentToken.isSelfClosing = true
    return data
  } else if (c === 'EOF') {

  } else {

  }
}

module.exports.parseHTML = function parseHTML (html) {
  let state = data
  for (const c of html) {
    state = state(c)
  }
  state = state(EOF)
}
