const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
if (env === 'dev') {
    //db
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '1q8e9t6WU!',
        port: '3306',
        database: 'myblog'
    }
    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
if (env === 'production') {
    //db
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '1q8e9t6WU!',
        port: '3306',
        database: 'myblog'
    }
    //redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}