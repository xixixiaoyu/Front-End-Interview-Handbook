// 引入 path 模块
const path = require('path')

// 1. 拼接路径
const fullPath = path.join('/home', 'user', 'documents', 'file.txt')
console.log('拼接路径:', fullPath)

// 2. 解析绝对路径
const absolutePath = path.resolve('src', 'components', 'Button.js')
console.log('解析绝对路径:', absolutePath)

// 3. 获取路径信息
const filePath = '/projects/myapp/src/index.js'
console.log('目录名:', path.dirname(filePath))
console.log('文件名:', path.basename(filePath))
console.log('扩展名:', path.extname(filePath))
console.log('不带扩展名的文件名:', path.basename(filePath, path.extname(filePath)))

// 4. 路径解析
const pathInfo = path.parse('/home/user/docs/file.txt')
console.log('路径解析:', pathInfo)

// 5. 路径格式化
const pathObj = {
  dir: '/home/user/docs',
  base: 'file.txt',
}
console.log('路径格式化:', path.format(pathObj))

// 平台差异处理
console.log('操作系统默认路径分隔符:', path.sep)
console.log('Windows 风格路径分隔符:', path.win32.sep)
console.log('POSIX 风格路径分隔符:', path.posix.sep)

// 实用技巧
// 1. 获取项目根目录
const rootPath = path.resolve(__dirname, '..', '..')
console.log('项目根目录:', rootPath)

// 2. 规范化路径
const messyPath = '/home//user/./docs/../downloads/file.txt'
console.log('规范化路径:', path.normalize(messyPath))

// 3. 判断是否为绝对路径
console.log('是否为绝对路径:', path.isAbsolute('/home/user'))
console.log('是否为绝对路径:', path.isAbsolute('./documents'))

// 实际应用示例
const fs = require('fs')

function loadConfig() {
  const configPath = path.resolve(process.cwd(), 'config.json')

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    return config
  } catch (error) {
    console.error('无法加载配置文件:', error.message)
    return {}
  }
}

console.log('加载配置文件:', loadConfig())
