const serverHandle = require('../app')
const http = require("http");
const PORT = 8000
// create http webserver instance
const server = http.createServer(serverHandle)
// Start the server listening on the specified port (in this case 8000)
// Once the server is started, it will start listening for all incoming requests on that port and process them using the "serverHandle" function passed earlier
server.listen(PORT)