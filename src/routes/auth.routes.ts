import { Router } from 'express'
import { validateUser } from '../middlewares/validators/user.validator'
import { register } from '../controllers/auth_controllers/signup.controller'
import { login } from '../controllers/auth_controllers/signin.controller'

const userRouter = Router()

userRouter.post('/login', login)
userRouter.post('/register', validateUser, register)

export default userRouter
