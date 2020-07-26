const http = require('http')

const file = `
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <div id="text">
    <p>Hello World</p>
    <img id="myid" />
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
