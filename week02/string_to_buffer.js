function UTF8_Encoding (string) {
  const buf = Buffer.from(string, 'utf-8')
  console.log(buf)
}

function UTF8_Encoding1 (string) {
  const encoder = new TextEncoder('utf-8')
  const view = encoder.encode(string)
  console.log(view)
}

let text
text = 'I am Max'

UTF8_Encoding(text)
UTF8_Encoding1(text)

text = '1'
UTF8_Encoding(text)
UTF8_Encoding1(text)
console.log(text.charCodeAt(0))

text = '唐'
UTF8_Encoding(text)
UTF8_Encoding1(text)
console.log(text.charCodeAt(0))

function f () {
  var undefined = 1
  console.log(undefined)
}

function test () {
  var a
  if (a === void 0) {
    console.log('a is undefined')
  }
}
test()
f()

class Human {
  constructor (name) {
    this.name = name
    this.status = 'normal'
    console.log(`${this.name} status is ${this.status}`)
  }

  hurt (attack) {
    this.status = attack
    console.log(`${this.name} status changes to ${this.status}`)
  }
}

class Dog {
  constructor (name) {
    this.name = name
  }

  bite () {
    return `${this.name} bites`
  }
}

const max = new Human('Max')
const dog = new Dog('wangcai')

max.hurt(dog.bite())
