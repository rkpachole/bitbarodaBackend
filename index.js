const http = require('http')
const app = require('./app');
require('dotenv').config()
const port = process.env.PORT || 4006;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`server listening at:${port}`)
});

