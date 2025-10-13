import express from 'express'
import { productsRouter } from './routes/products.js'
const PORT = 8000

const app = express()

app.use(express.static('public'))

app.use('/api/products', productsRouter)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
  .on('error', () => {
    console.error('failed to start server', err)
  });
