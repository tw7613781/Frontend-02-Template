/* eslint-disable camelcase */
function fsm_abcabx (s) {
  let state = state0
  for (const c of s) {
    state = state(c)
  }
  return state === end
}

function end (c) {
  return end
}

function state0 (c) {
  if (c === 'a') {
    return state1
  } else {
    return state0
  }
}

function state1 (c) {
  if (c === 'b') {
    return state2
  } else {
    return state0(c)
  }
}

function state2 (c) {
  if (c === 'c') {
    return state3
  } else {
    return state0(c)
  }
}

function state3 (c) {
  if (c === 'a') {
    return state4
  } else {
    return state0(c)
  }
}

function state4 (c) {
  if (c === 'b') {
    return state5
  } else {
    return state0(c)
  }
}

function state5 (c) {
  if (c === 'x') {
    return end
  } else {
    return state2(c)
  }
}

let s = 'ababcabx'
console.log(s, fsm_abcabx(s))

s = 'dfewfqgqabcdeabcdefabcabx'
console.log(s, fsm_abcabx(s))

s = 'dfewfqgqabcdeabcdefabcab'
console.log(s, fsm_abcabx(s))

s = 'abcabcabx'
console.log(s, fsm_abcabx(s))
