import { upload } from '../../config/multer.config';
import express from 'express'
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './users.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const usersController = new UserController(userService)

const router = express.Router();

router.get('/', authMiddleware, usersController.me);
router.post('/profile', upload.single('profile'), usersController.updateProfile);


export default router;