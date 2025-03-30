package main

import "fmt"

func main() {
    // 变量声明和使用
    var age int // 标准格式声明变量
    fmt.Println("初始 age:", age) // 输出: 初始 age: 0

    age = 30 // 赋值，改变 age 的值
    fmt.Println("后来 age:", age) // 输出: 后来 age: 30

    var name string = "小明" // 声明 + 初始化
    fmt.Println("名字:", name) // 输出: 名字: 小明

    var score = 95.5 // 类型推断
    fmt.Println("分数:", score) // 输出: 分数: 95.5

    city := "北京" // 短变量声明 (最常用！)
    fmt.Println("城市:", city) // 输出: 城市: 北京

    name = "小强" // 改变 name 的值
    fmt.Println("新名字:", name) // 输出: 新名字: 小强

    // 常量声明和使用
    const pi = 3.14159 // 类型推断声明常量
    const greeting = "你好"
    fmt.Println(greeting, pi) // 输出: 你好 3.14159

    // greeting = "Hello" // 这行会报错！常量不能修改

    const (
        a = iota // a = 0, iota 被重置为 0
        b        // b = 1, 没写值，默认和上一行一样，iota 递增
        c = iota // c = 2, 显式使用 iota，此时 iota 是 2
        d        // d = 3, 没写值，默认和上一行一样，iota 递增
    )

    const (
        _  = iota             // 0, 使用空白标识符忽略
        KB = 1 << (10 * iota) // 1 << (10*1) = 1024 (KB)
        MB = 1 << (10 * iota) // 1 << (10*2) = 1048576 (MB)
        GB = 1 << (10 * iota) // 1 << (10*3) = 1073741824 (GB)
    )

    fmt.Println(a, b, c, d) // 输出: 0 1 2 3
    fmt.Println(KB, MB, GB) // 输出: 1024 1048576 1073741824
}
