import http from 'node:http'

const server = http.createServer((req, res) => {
  console.log('server accessed')
  res.end('<html><body>Hello</body></html>')
})

server.listen(8000, () => console.log('listening 8000'))