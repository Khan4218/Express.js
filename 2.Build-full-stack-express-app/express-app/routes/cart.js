import express from 'express'
import { addToCart } from '../controllers/cartController.js'
import { getCartCount } from '../controllers/cartController.js'
export const cartRouter = express.Router()

cartRouter.post('/add', addToCart) 

cartRouter.get('/cart-count', getCartCount);