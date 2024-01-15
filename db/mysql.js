const mysql = require('mysql')
const {MYSQL_CONF} = require('./conf/databaseConfig')
const con = mysql.createConnection(MYSQL_CONF)
// 开始链接
con.connect()

//执行语句
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

module.exports = {
    exec
}
// 单例模式，不必关闭
// con.end()