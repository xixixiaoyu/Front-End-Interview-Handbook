// 示例 1: 使用 'any' 导致类型信息丢失

/**
 * 这个函数接受任何类型的参数，并返回该参数。
 * 但是，由于参数类型被指定为 'any'，TypeScript 编译器
 * 无法在函数调用后保留或推断出具体的类型信息。
 */
function fooAny(val: any) {
  return val;
}

// 调用函数
const resAny = fooAny('hello');

// 检查 resAny 的类型
// 当你将鼠标悬停在 resAny 上时，编辑器会显示其类型为 'any'。
// 这意味着我们失去了 TypeScript 的类型安全优势，
// 无法在编译时捕获潜在的类型错误。
console.log('Type of resAny:', typeof resAny); // 输出 'string' (运行时类型)，但编译时类型是 'any'
// resAny.someNonExistentMethod(); // TypeScript 不会报错，因为 resAny 是 'any'

console.log('---');

// 示例 2: 使用泛型 '<T>' 实现良好的类型支持

/**
 * 这个函数使用泛型 <T>。
 * 它接受一个类型为 T 的参数，并返回一个同类型 T 的值。
 * 泛型允许 TypeScript 在函数调用时捕获输入参数的具体类型，
 * 并在函数返回时保留这个类型信息。
 */
function fooGeneric<T>(val: T): T {
  return val;
}

// 调用函数
const resGeneric = fooGeneric('hello');
const resGenericNum = fooGeneric(123);

// 检查 resGeneric 的类型
// 当你将鼠标悬停在 resGeneric 上时，编辑器会正确推断出其类型为 'hello' (字符串字面量类型)。
// 当你将鼠标悬停在 resGenericNum 上时，编辑器会正确推断出其类型为 123 (数字字面量类型)。
// 这就是良好的类型支持：类型信息被准确地保留和传递。
console.log('Type of resGeneric:', typeof resGeneric); // 输出 'string'
console.log('Type of resGenericNum:', typeof resGenericNum); // 输出 'number'

// resGeneric.someNonExistentMethod(); // TypeScript 会报错，因为 resGeneric 的类型是 'hello'，没有这个方法。

// 结论:
// 虽然两个函数都使用 TypeScript 编写，但只有 fooGeneric 提供了良好的类型支持。
// 良好的类型支持意味着 TypeScript 的类型系统能够有效地工作，
// 在整个代码库中跟踪和强制执行类型，从而提高代码质量和开发效率。
// 仅仅用 TypeScript 编写代码是不够的，关键在于如何利用其类型系统来保留和推断类型信息。