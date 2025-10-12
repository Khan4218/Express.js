import express from 'express'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('<!doctype html><html><body>Hello Express!</body></html>')
})

app.listen(3000, () => console.log('listening 3000')) 
