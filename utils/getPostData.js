function getPostData(req) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        // if (req.headers['Content-Type'] !== 'application/json') {
        //     resolve({})
        //     return
        // }
        let postdata = ''
        req.on('data', (chunk) => {
            postdata += chunk.toString()
        })
        req.on('end', () => {
            if (!postdata) {
                resolve({})
                return
            }
            resolve(JSON.parse(postdata))
        })
    })
}

module.exports = {
    getPostData
}