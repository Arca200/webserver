// 用于解析 URL 中的查询字符串
const querystring = require('querystring')
const {redisSet, redisGet, loginAuth} = require('./db/redis')
// 异步获取 POST 请求的数据
const {getPostData} = require('./utils/getPostData')

// 引入处理用户和博客路由的模块
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

// 计算 cookie 过期时间
const getCookieExpires = () => {
    const date = new Date()
    date.setTime(date.getTime() + 600 * 1000)
    return date.toUTCString()
}

// 定义一个处理 HTTP 请求的函数，该函数包含整个服务器的逻辑
const serverHandle = (req, res) => {
    // 设置响应头，表明响应内容为 JSON 格式
    res.setHeader('Content-Type', 'application/json')
    // 解析 URL 中的路径和查询参数，并将其存储在 req.path 和 req.query 中
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])
    // 解析请求头中的 Cookie，并将其存储在 req.cookie 中
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0]
        req.cookie[key] = arr[1]
    })
    // 判断用户是否已经有有效的会话（通过检查 req.cookie.userid）。
    // 如果有，将会话数据存储在 req.session 中；否则，生成一个新的用户 ID，并创建一个新的会话
    let needSetCookie = false
    let userId = req.cookie.userId
    redisGet('userId').then(res => {
        if (res !== userId) {
            needSetCookie = true
            userId = `${Date.now()}_${Math.random()}`
        }
    })
    getPostData(req).then((postData) => {
        // 使用 getPostData 函数异步获取 POST 请求的数据，并将其存储在 req.body 中
        req.body = postData
        // 调用处理博客路由的模块 handleBlogRouter，如果路由匹配成功，返回相应数据并设置 cookie
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData))
            })
            return
        }
        // 如果博客路由未匹配成功，调用处理用户路由的模块 handleUserRouter，返回相应数据并设置 cookie
        const userResult = handleUserRouter(req, res)
        if (userResult) {

            userResult.then(userData => {
                if (req.status === 'login' && needSetCookie) {
                    redisSet('userId', userId)
                    res.setHeader('Set-Cookie', `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        // 如果既没有匹配博客路由也没有匹配用户路由，则返回 404 Not Found
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })
}
module.exports = serverHandle