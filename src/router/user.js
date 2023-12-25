const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')

const handleUserRouter = (req, res) => {
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const {username, password} = req.body
        const loginResult = login(username, password)
        return loginResult.then(result => {
            if (result) {
                req.session.username = result.username
                req.session.realname = result.realname
                console.log(req.session)
                return new SuccessModel('login worked')
            } else {
                return new ErrorModel('login failed')
            }

        })
    }
    if (method === 'GET' && req.path === '/api/user/getInfo') {
        console.log(req.session)
        if (req.session.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.session.username
                })
            )
        }
        return Promise.resolve(
            new ErrorModel('please login')
        )
    }
}
module.exports = handleUserRouter