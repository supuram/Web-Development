import express from 'express'
import { signup } from './../controllers/user-controller.js'
import { login }  from './../controllers/user-controller.js'
import { verifyToken } from './../controllers/user-controller.js'
import { getUser } from './../controllers/user-controller.js'
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', verifyToken, getUser)
export default router