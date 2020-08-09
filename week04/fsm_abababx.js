/* eslint-disable camelcase */
function fsm_abababx (s) {
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
  if (c === 'a') {
    return state3
  } else {
    return state0(c)
  }
}

function state3 (c) {
  if (c === 'b') {
    return state4
  } else {
    return state0(c)
  }
}

function state4 (c) {
  if (c === 'a') {
    return state5
  } else {
    return state0(c)
  }
}

function state5 (c) {
  if (c === 'b') {
    return state6
  } else {
    return state0(c)
  }
}

function state6 (c) {
  if (c === 'x') {
    return end
  } else {
    return state4(c)
  }
}

let s = 'ababcabx'
console.log(s, fsm_abababx(s))

s = 'dfewfqgqabcdeabcdefabcabx'
console.log(s, fsm_abababx(s))

s = 'dfewfqgqabcdeabcdefabcab'
console.log(s, fsm_abababx(s))

s = 'abcabcabx'
console.log(s, fsm_abababx(s))

s = 'abababx'
console.log(s, fsm_abababx(s))

s = 'abababababababax'
console.log(s, fsm_abababx(s))

s = 'abababababx'
console.log(s, fsm_abababx(s))

s = 'ababababx'
console.log(s, fsm_abababx(s))
