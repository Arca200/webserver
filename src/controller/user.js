const {exec} = require("../../db/mysql");
const login = (username, password) => {
    let sql = `select username,realname from user where username='${username}' and password='${password}'`
    return exec(sql).then(rows => {
        if (rows.length > 0) {
            return rows[0]
        } else {
            return []
        }
    })
}
module.exports = {
    login
}