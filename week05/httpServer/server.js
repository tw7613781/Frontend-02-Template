const http = require('http')

const file = `<html lang="en">
<head>
  <title>Document</title>
  <style>
    body div #myid{
      width: 100px;
      background-color: #ff5000;
    }
    body div img{
      width: 30px;
      background-color: #ff1111;      
    }
  </style>
</head>
<body>
  <div>
    <p id='myid'>Hello World</p>
    <img />
  </div>
</body>
</html>
`

http.createServer((request, response) => {
  let body = []
  console.log(request.headers)
  request.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('body:', body)
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(file)
    response.end()
  })
}).listen(8888)

console.log('server started on port:8888')
