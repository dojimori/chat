
import express from 'express'
// import { register, login, logout } from './auth.controller'
import authController from './auth.controller';
const router = express.Router(); 

router.post('/register', authController.register)
router.post('/login', authController.login)
// router.post('/login', login)
router.post('/logout', authController.logout)

export default router;