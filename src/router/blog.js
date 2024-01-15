const {getList, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {loginAuth, redisGet} = require('../../db/redis')

const handleBlogRouter = (req, res) => {
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const listData = getList(author)
        return listData.then(res => {
            return new SuccessModel(res)
        })
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail()
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        req.body.author = req.session.username
        const result = newBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }
    if (method === 'POST' && req.path === '/api/blog/updata') {
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel('更新博客成功')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        const delResult = delBlog(id, 'admin')
        return delResult.then(val => {
            if (val) {
                return new SuccessModel('删除博客成功')
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter