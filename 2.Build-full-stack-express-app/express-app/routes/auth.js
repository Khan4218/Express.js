import { registerUser, loginUser, logOutUser} from "../controllers/authController.js";
import { logSignIn } from "../middleware/logSignIn.js";
import express from 'express'

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login',logSignIn, loginUser)
authRouter.get('/logout', logOutUser)


