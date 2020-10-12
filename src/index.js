const http = require('http');
const { Getroutes } = require('./Routes/routes')
const server = http.createServer((req, res) => {
    Getroutes(req, res)
})
server.listen(4000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log('servidor corriendo en port 4000')
})