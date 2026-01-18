
import express from 'express'
// import { register, login, logout } from './auth.controller'
// import authController from './auth.controller';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../users/user.repository';

const userRepo = new UserRepository();
const authService = new AuthService(userRepo);
const authController = new AuthController(authService)

const router = express.Router();

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router;