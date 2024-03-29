const {exec} = require('../../db/mysql')
const getList = (author) => {
    let sql = `select id,title,content,createtime,author from blog where state = 1`
    if (author) {
        sql += ` and author='${author}'`
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
        return insertData.affectedRows > 0;
    })
}
const delBlog = (id, author) => {
    let sql = `delete from blog where id ="${id}" and author="${author}"`
    return exec(sql).then(deleteData => {
        return deleteData.affectedRows > 0;
    })
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}