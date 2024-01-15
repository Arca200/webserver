const {createClient} = require('redis')
const {REDIS_CONF} = require('./conf/databaseConfig')
const {SuccessModel, ErrorModel} = require("../src/model/resModel");
//如果不传参就使用默认端口和默认地址
const client = createClient(REDIS_CONF);
//连接redis
client.connect().then(res => {
    console.log('redis连接成功')
}).catch(err => {
    console.log('redis连接失败')
})
const redisGet = (key) => {
    return client.get(key).then(res => {
        return res
    })
}
const redisSet = (key, value) => {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    client.set(key, value).then(res => {
        console.log(`存储成功(${key}:${value})`)
    }).catch(err => {
        console.log('存储失败', err)
    })
}
const redisDel = () => {
    console.log('?')
    client.del('realname')
    client.del('username')
    client.del('userId')

}
const loginAuth = async (username) => {
    const result = await redisGet('username')
    return result === username;
}
module.exports = {
    redisGet,
    redisSet,
    loginAuth,
    redisDel
}