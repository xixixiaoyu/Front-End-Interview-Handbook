// 可能导致内存问题的例子
function createLargeData() {
  const largeData = new Array(10000)

  return function () {
    return largeData // largeData 一直被引用
  }
}
