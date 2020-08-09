const assert = require('assert')
function string2number (str) {
  // 只接受字符串为参数
  if (typeof str !== 'string') return NaN
  // 移除字符串首尾的空格
  str = str.trim()
  // 十进制
  const dec = /^-?[0-9]+\.?[0-9]*$/
  // 二进制
  const bin = /^0b[0-1]+$/
  // 八进制
  const oct = /^0o[0-7]+$/
  // 十六进制
  const hex = /^0x[0-9a-fA-F]+$/
  // 科学记数法
  const sci = /^-?[0-9]+\.?[0-9]*e[+-]?[0-9]+/

  if (dec.test(str)) {
    console.log('dec')
    let negative
    // 是否为负数
    if (str[0] === '-') {
      negative = true
      str = str.slice(1)
    }
    const twoPart = str.split('.')
    // 整数部分
    const integer = string2integer(twoPart[0])
    // 是否有小数部分
    let float = 0
    if (twoPart.length === 2) {
      float = string2float(twoPart[1])
    }
    const ret = integer + float
    return negative ? -ret : ret
  } else if (bin.test(str)) {
    console.log('bin')
    // remove '0b'
    str = str.slice(2)
    // remove leading zero
    if (str[0] === '0') {
      str = str.replace(/^0+(?!$)/, '')
    }
    let sum = 0
    for (let i = str.length - 1; i >= 0; i--) {
      sum += str[i] * (2 ** (str.length - 1 - i))
    }
    return sum
  } else if (oct.test(str)) {
    console.log('oct')
    // remove '0o'
    str = str.slice(2)
    // remove leading zero
    if (str[0] === '0') {
      str = str.replace(/^0+(?!$)/, '')
    }
    let sum = 0
    for (let i = str.length - 1; i >= 0; i--) {
      sum += str[i] * (8 ** (str.length - 1 - i))
    }
    return sum
  } else if (hex.test(str)) {
    console.log('hex')
    // remove '0x'
    str = str.slice(2)
    // remove leading zero
    if (str[0] === '0') {
      str = str.replace(/^0+(?!$)/, '')
    }
    let sum = 0
    for (let i = str.length - 1; i >= 0; i--) {
      let temp = str[i]
      if (str[i] === 'a' || str[i] === 'A') {
        temp = 10
      }
      if (str[i] === 'b' || str[i] === 'B') {
        temp = 11
      }
      if (str[i] === 'c' || str[i] === 'C') {
        temp = 12
      }
      if (str[i] === 'd' || str[i] === 'D') {
        temp = 13
      }
      if (str[i] === 'e' || str[i] === 'E') {
        temp = 14
      }
      if (str[i] === 'f' || str[i] === 'F') {
        temp = 15
      }
      sum += temp * (16 ** (str.length - 1 - i))
    }
    return sum
  } else if (sci.test(str)) {
    console.log('science notation')
    let negative
    // negative integer
    if (str[0] === '-') {
      negative = true
      str = str.slice(1)
    }
    let [decimal, exp] = str.split('e')
    const twoPart = decimal.split('.')
    const integer = string2integer(twoPart[0])
    let float = 0
    if (twoPart.length === 2) {
      float = string2float(twoPart[1])
    }
    const ret = integer + float
    decimal = negative ? -ret : ret
    negative = false
    if (exp[0] === '-') {
      negative = true
      exp = exp.slice(1)
    }
    exp = string2integer(exp)
    exp = negative ? -exp : exp
    return decimal * (10 ** exp)
  } else {
    return Number.NaN
  }
}

function string2integer (str) {
  let integer = 0
  for (let i = str.length - 1; i >= 0; i--) {
    integer += str[i] * (10 ** (str.length - 1 - i))
  }
  return integer
}

function string2float (str) {
  let float = 0
  for (let i = 0; i < str.length; i++) {
    float += str[i] * (10 ** -(i + 1))
  }
  return float
}

let str, ret

str = '-10'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-010'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '02345'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '2345234324325000001'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '1.1'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '23423.325235234213423'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0.0'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0.01213'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0b1010'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0b10103'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0o237'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0o00237'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0o23711'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '0xffff'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '1e4'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-1e4'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-3e20'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-3e40'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-01.2323e4'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-3e2.0'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))

str = '-3.14e2'
ret = string2number(str)
console.log(str, ret)
assert.equal(ret, Number(str))
