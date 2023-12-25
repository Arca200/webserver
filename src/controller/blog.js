const {exec} = require('../../mysql/index')
const getList = (author, keyword) => {
    let sql = `select id,title,content,createtime,author from blog where state = 1`
    if (author) {
        sql += ` and author='${author}'`
    }
    if (keyword) {
        sql += ` and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`
    return exec(sql)
}
const getDetail = (id) => {
    let sql = `select id,title,content,createtime,author from blog where state = 1`
    if (id) {
        sql += ` and id='${id}'`
    }
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    const {title, content, author} = blogData
    const createtime = Date.now()
    const sql = `insert into blog (title,content,createtime,author) value ('${title}','${content}','${createtime}','${author}')`
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}
const updateBlog = (id, blogData = {}) => {
    const {title, content} = blogData
    let sql = `update blog set`
    if (title) {
        sql += ` title="${title}",`
    }
    if (content) {
        sql += ` content="${content}" `
    }
    sql += ` where id="${id}"`
    return exec(sql).then(insertData => {
        if (insertData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
const delBlog = (id, author) => {
    let sql = `delete from blog where id ="${id}" and author="${author}"`
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}