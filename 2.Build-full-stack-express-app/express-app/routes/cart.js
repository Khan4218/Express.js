import express from 'express'
import { addToCart } from '../controllers/cartController.js'
import { getCartCount, getAll } from '../controllers/cartController.js'
export const cartRouter = express.Router()

cartRouter.post('/add', addToCart) 

cartRouter.get('/cart-count', getCartCount);
cartRouter.get('/', getAll);