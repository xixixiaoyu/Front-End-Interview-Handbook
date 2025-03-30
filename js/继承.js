// 1. 原型链继承
function Animal(name) {
  this.name = name
}

Animal.prototype.sayName = function () {
  console.log(`我是 ${this.name}`)
}

function Dog(name, breed) {
  Animal.call(this, name)
  this.breed = breed
}

// 建立原型链
Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function () {
  console.log('汪汪！')
}

const myDog = new Dog('小黑', '拉布拉多')
myDog.sayName() // 我是 小黑
myDog.bark() // 汪汪！

// 2. 构造函数继承
function Parent() {
  this.colors = ['红', '蓝', '绿']
}

function Child() {
  // 调用父构造函数
  Parent.call(this)
}

const child1 = new Child()
child1.colors.push('黄')
console.log(child1.colors) // ['红', '蓝', '绿', '黄']

const child2 = new Child()
console.log(child2.colors) // ['红', '蓝', '绿'] - 不受 child1 的影响

// 3. 组合继承
function ParentCombined(name) {
  this.name = name
  this.colors = ['红', '蓝', '绿']
}

ParentCombined.prototype.sayName = function () {
  console.log(`Hi, I'm ${this.name}`)
}

function ChildCombined(name, age) {
  // 继承属性
  ParentCombined.call(this, name)
  this.age = age
}

// 继承方法
ChildCombined.prototype = new ParentCombined()
ChildCombined.prototype.constructor = ChildCombined

ChildCombined.prototype.sayAge = function () {
  console.log(`我今年 ${this.age} 岁了`)
}

const childCombined1 = new ChildCombined('小明', 5)
childCombined1.sayName() // Hi, I'm 小明
childCombined1.sayAge() // 我今年 5 岁了

// 4. ES6 class 继承
class AnimalClass {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} 发出声音`)
  }
}

class DogClass extends AnimalClass {
  constructor(name, breed) {
    super(name) // 调用父类构造函数
    this.breed = breed
  }

  speak() {
    console.log(`${this.name} 汪汪叫`)
  }

  showBreed() {
    console.log(`我是一只 ${this.breed}`)
  }
}

const myDogClass = new DogClass('旺财', '哈士奇')
myDogClass.speak() // 旺财 汪汪叫
myDogClass.showBreed() // 我是一只 哈士奇
