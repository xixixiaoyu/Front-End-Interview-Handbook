// 引入必要的模块
const express = require('express')
const path = require('path')
const app = express()

// 静态资源中间件
app.use(
  '/static',
  express.static(path.join(__dirname, 'public'), {
    maxAge: '1y', // 强缓存一年
    etag: true, // 启用 ETag
    lastModified: true, // 启用 Last-Modified
  })
)

// API 响应的协商缓存
app.get('/api/data', (req, res) => {
  const data = { message: 'Hello World', timestamp: Date.now() }

  // 设置协商缓存
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('ETag', generateETag(data)) // 自定义生成 ETag

  res.json(data)
})

// 简单的 ETag 生成函数
function generateETag(data) {
  return require('crypto').createHash('md5').update(JSON.stringify(data)).digest('hex')
}

// 缓存中间件工厂函数
function cacheControl(options) {
  const { type, maxAge } = options

  return (req, res, next) => {
    switch (type) {
      case 'static':
        // 静态资源使用强缓存
        res.setHeader('Cache-Control', `public, max-age=${maxAge || 31536000}, immutable`)
        break

      case 'html':
        // HTML 页面使用协商缓存
        res.setHeader('Cache-Control', 'no-cache')
        break

      case 'api':
        // API 响应使用短期缓存或协商缓存
        res.setHeader('Cache-Control', `private, max-age=${maxAge || 60}`)
        break

      case 'no-store':
        // 敏感数据不缓存
        res.setHeader('Cache-Control', 'no-store')
        break
    }

    next()
  }
}

// 使用方式
app.get('/', cacheControl({ type: 'html' }), (req, res) => {
  res.send('首页内容')
})

app.get('/api/user', cacheControl({ type: 'api', maxAge: 300 }), (req, res) => {
  res.json({ user: 'Zhang San' })
})

app.get('/api/sensitive', cacheControl({ type: 'no-store' }), (req, res) => {
  res.json({ key: 'sensitive-data' })
})

app.listen(3000, () => console.log('服务器运行在 3000 端口'))
