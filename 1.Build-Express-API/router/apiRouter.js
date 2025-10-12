import express from 'express'
import { getAllData } from "../controllers/getAllData.js";
import { getAllDataByPathParams } from "../controllers/getAllDataByPathParams.js";

export const apiRouter = express.Router();

apiRouter.get('/', getAllData);

apiRouter.get('/:field/:term', getAllDataByPathParams);

