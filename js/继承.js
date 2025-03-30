// 1. 原型链继承 (ES6 之前的主要方式)
// 来个“父类” - 动物
function Animal(name) {
  this.name = name
  this.type = '动物'
}

// 给动物的原型添加一个方法
Animal.prototype.sayHello = function () {
  console.log(`你好，我是 ${this.name}，一个 ${this.type}`)
}

// 来个“子类” - 狗
function Dog(name, breed) {
  // 关键点 1: 调用父类的构造函数，继承父类的实例属性
  // 使用 .call() 把 Animal 里的 this 指向当前的 Dog 实例
  Animal.call(this, name)
  this.breed = breed
  this.type = '狗' // 可以覆盖父类的属性
}

// 关键点 2: 让子类的原型指向父类原型的一个实例
// Object.create() 是推荐的方式，它创建一个新对象，
// 这个新对象的 __proto__ 指向 Animal.prototype
Dog.prototype = Object.create(Animal.prototype)

// 关键点 3: 修复构造函数指向
// 上一步操作会把 Dog.prototype.constructor 指向 Animal，需要手动修正回来
Dog.prototype.constructor = Dog

// 给狗的原型添加一个特有方法
Dog.prototype.bark = function () {
  console.log('汪汪！')
}

// 测试一下
const myDog = new Dog('旺财', '哈士奇')
myDog.sayHello() // 输出: 你好，我是 旺财，一个 狗 (继承并覆盖了 type)
myDog.bark() // 输出: 汪汪！
console.log(myDog instanceof Dog) // true
console.log(myDog instanceof Animal) // true

// 2. ES6 class 继承 (现在的主流方式)
// 父类 - 动物
class Animal {
  constructor(name) {
    this.name = name
    this.type = '动物'
  }

  sayHello() {
    console.log(`你好，我是 ${this.name}，一个 ${this.type}`)
  }
}

// 子类 - 狗
// 使用 extends 关键字实现继承
class Dog extends Animal {
  constructor(name, breed) {
    // 关键点 1: 调用父类的 constructor
    // 在子类的 constructor 里，必须先调用 super() 才能使用 this
    super(name) // 这会调用 Animal 的 constructor(name)

    this.breed = breed
    this.type = '狗' // 同样可以覆盖
  }

  // 子类特有方法
  bark() {
    console.log('汪汪！')
  }

  // 也可以覆盖父类的方法，甚至在里面调用父类的方法
  sayHello() {
    // 关键点 2: 使用 super 调用父类的方法
    super.sayHello()
    console.log('我是一只可爱的狗狗！')
  }
}

// 测试一下
const myNewDog = new Dog('小黑', '拉布拉多')
myNewDog.sayHello()
// 输出:
// 你好，我是 小黑，一个 狗
// 我是一只可爱的狗狗！

myNewDog.bark() // 输出: 汪汪！
console.log(myNewDog instanceof Dog) // true
console.log(myNewDog instanceof Animal) // true
