const http=require('http');

const server=http.createServer((req,res)=>{
    //set the content type to html
    res.writeHead(200,{'Content-Type':'text/html'});
    //write your HTML content
    res.write('<h1>Hello World</h1>');
    res.write('<p> this is Html contnt served from node.js</p>');
    res.end();
});
server.listen(3000,()=>{
    console.log('Server running at http://localhost:3000/')
})