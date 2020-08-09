const assert = require('assert')

function findA (s) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'a') {
      return i
    }
  }
  return -1
}

function findAb (s) {
  for (let i = 0, j = 1; j < s.length; i++, j++) {
    if (s[i] === 'a' && s[j] === 'b') {
      return i
    }
  }
  return -1
}

function findAbcdef (s) {
  let findA = false; let findB = false; let findC = false; let findD = false; let findE = false
  for (const c of s) {
    if (c === 'a') {
      findA = true; findB = false; findC = false; findD = false; findE = false
    } else if (findA && c === 'b') {
      findA = false; findB = true; findC = false; findD = false; findE = false
    } else if (findB && c === 'c') {
      findA = false; findB = false; findC = true; findD = false; findE = false
    } else if (findC && c === 'd') {
      findA = false; findB = false; findC = false; findD = true; findE = false
    } else if (findD && c === 'e') {
      findA = false; findB = false; findC = false; findD = false; findE = true
    } else if (findE && c === 'f') {
      return true
    } else {
      findA = false; findB = false; findC = false; findD = false; findE = false
    }
  }
  return false
}

let s, retA, retAb, ret

s = 'afdfdfdfdf'
retA = findA(s)
retAb = findAb(s)
ret = findAbcdef(s)
assert.equal(retA, 0)
assert.equal(retAb, -1)
assert.equal(ret, false)

s = 'fdfdfdfdfab'
retA = findA(s)
retAb = findAb(s)
ret = findAbcdef(s)
assert.equal(retA, 9)
assert.equal(retAb, 9)
assert.equal(ret, false)

s = 'fdfdafdfdfab'
retA = findA(s)
retAb = findAb(s)
ret = findAbcdef(s)
assert.equal(retA, 4)
assert.equal(retAb, 10)
assert.equal(ret, false)

s = 'abcdefghijk'
ret = findAbcdef(s)
assert.equal(ret, true)

s = 'sdf2323abcdefghijk'
ret = findAbcdef(s)
assert.equal(ret, true)

s = 'adsfdsfabcdefghijkadsfdf'
ret = findAbcdef(s)
assert.equal(ret, true)

s = 'adfaadfdfbcdefghijkadsfd'
ret = findAbcdef(s)
assert.equal(ret, false)

s = 'abacdef'
ret = findAbcdef(s)
assert.equal(ret, false)
