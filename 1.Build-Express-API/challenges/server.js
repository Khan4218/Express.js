import express from 'express'

const app = express()

const test = {
  name: 'Akbar'
}

/*
Challenge: 
1. Update the code so a GET request to api/metals/gold
    logs an object {category: ‘metals’, type: ‘gold’}

But a GET request to api/crypto/eth
    logs an object {category: crypto-name, type: eth}
*/

app.get('/api/:category/:type', (req, res) => {

  console.log(req.params)
  res.json()
})

// app.get('/', (req, res) => {
//   res.json(test)
// })

console.log('Hi from challenges');

app.listen(3000, () => console.log('listening 3000'))