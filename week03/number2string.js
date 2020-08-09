const assert = require('assert')

function number2string (num, scale) {
  if (scale === 2) {
    // binary
    if (num === 0) return '0'
    let ret = ''
    while (num > 0) {
      ret += num % 2
      num = Math.floor(num / 2)
    }
    return ret.split('').reverse().join('')
  } else if (scale === 8) {
    // octal
    if (num === 0) return '0'
    let ret = ''
    while (num > 0) {
      ret += num % 8
      num = Math.floor(num / 8)
    }
    return ret.split('').reverse().join('')
  } else if (scale === 10) {
    // decimal
    return String(num)
  } else if (scale === 16) {
    // hexa
    if (num === 0) return '0'
    let ret = ''
    while (num > 0) {
      const temp = num % 16
      if (temp === 10) {
        ret += 'a'
      } else if (temp === 11) {
        ret += 'b'
      } else if (temp === 12) {
        ret += 'c'
      } else if (temp === 13) {
        ret += 'd'
      } else if (temp === 14) {
        ret += 'e'
      } else if (temp === 15) {
        ret += 'f'
      } else {
        ret += temp
      }
      num = Math.floor(num / 16)
    }
    return ret.split('').reverse().join('')
  } else {
    // invalid scale params, return undefined
    // eslint-disable-next-line no-void
    return void 0
  }
}

let num, ret

num = 10
ret = number2string(num, 2)
console.log(num, ret)
assert.equal(ret, num.toString(2))

num = 10
ret = number2string(num, 8)
console.log(num, ret)
assert.equal(ret, num.toString(8))

num = 10
ret = number2string(num, 10)
console.log(num, ret)
assert.equal(ret, num.toString(10))

num = 10
ret = number2string(num, 16)
console.log(num, ret)
assert.equal(ret, num.toString(16))

num = 23
ret = number2string(num, 2)
console.log(num, ret)
assert.equal(ret, num.toString(2))

num = 23
ret = number2string(num, 8)
console.log(num, ret)
assert.equal(ret, num.toString(8))

num = 23
ret = number2string(num, 10)
console.log(num, ret)
assert.equal(ret, num.toString(10))

num = 23
ret = number2string(num, 16)
console.log(num, ret)
assert.equal(ret, num.toString(16))

num = 0
ret = number2string(num, 2)
console.log(num, ret)
assert.equal(ret, num.toString(2))

num = 3244235423545
ret = number2string(num, 2)
console.log(num, ret)
assert.equal(ret, num.toString(2))

num = 3244235423545
ret = number2string(num, 8)
console.log(num, ret)
assert.equal(ret, num.toString(8))

num = 3244235423545
ret = number2string(num, 10)
console.log(num, ret)
assert.equal(ret, num.toString(10))

num = 3244235423545
ret = number2string(num, 16)
console.log(num, ret)
assert.equal(ret, num.toString(16))
