import e from "express";
import { getGenres, getProducts } from "../controllers/productsController.js";

export const productsRouter = e.Router()

productsRouter.get('/genres', getGenres)

productsRouter.get('/', getProducts)
