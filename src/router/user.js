const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const {redisSet, redisGet, loginAuth, redisDel} = require('../../db/redis')
const handleUserRouter = async (req, res) => {
    const method = req.method
    req.status = 'login'
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const loginResult = login(username, password)
        return loginResult.then(result => {
            if (result) {
                redisSet('username', result.username)
                redisSet('realname', result.realname)
                return new SuccessModel('login worked')
            } else {
                return new ErrorModel('login failed')
            }

        })
    }
    if (method === 'GET' && req.path === '/api/user/getInfo') {
        req.status = 'test'
        return redisGet('userId').then(res => {
            if (res !== req.cookie.userId) {
                return new ErrorModel('未登陆')
            } else {
                return new SuccessModel('已经登陆')
            }
        }).catch(err => {
            return new ErrorModel('获取登陆状态失败')
        })
    }
    if (method === 'POST' && req.path === '/api/user/logout') {
        req.status = 'logout'
        redisDel()
    }
}
module.exports = handleUserRouter