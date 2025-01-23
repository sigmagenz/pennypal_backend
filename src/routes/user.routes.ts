import { Router } from 'express'
import { authorizeRole, verifyToken } from '../middlewares/auth'
import { createUser } from '../controllers/user_controllers/create_user.controller'
import { updateUser } from '../controllers/user_controllers/update_user.controller'
import { getUser } from '../controllers/user_controllers/get_user.controller'
import { getUsers } from '../controllers/user_controllers/get_all_users.controller'
import { deleteUser } from '../controllers/user_controllers/delete_user.controller'
import { deleteUsers } from '../controllers/user_controllers/delete_all_users.controller'
import { validateUser } from '../middlewares/validators/user.validator'

const userRouter = Router()

userRouter.post('/user', verifyToken, authorizeRole(["SUPERADMIN", "ADMIN"]), validateUser, createUser)
userRouter.patch('/user/:user_code', validateUser, updateUser)
userRouter.get('/user/:user_code', getUser)
userRouter.get('/user', verifyToken, authorizeRole(["SUPERADMIN", "ADMIN"]), getUsers)
userRouter.delete('/user/:user_code', deleteUser)
userRouter.delete('/user', verifyToken, authorizeRole(["SUPERADMIN", "ADMIN"]), deleteUsers)

export default userRouter
