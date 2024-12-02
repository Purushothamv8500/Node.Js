const http = require('http');

// create 

const server = http.createServer((req, res) => {
    // set responseheader
    
    res.writeHead(200,{'Content-Type':'text/plain'} );

    res.end("hello world!");
})


// define the port anmd start the server

const port = 3000;
server.listen(port,()=>{
    console.log('server is running on http://localhost:${port}');
});