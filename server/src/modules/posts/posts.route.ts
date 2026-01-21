import { Router } from 'express'
import { PostRepository } from './posts.repository';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { authMiddleware } from '../../middleware/auth.middleware';


const postRepo = new PostRepository()
const postService = new PostService(postRepo)
const postController = new PostController(postService)

const router = Router()

router.post('/', postController.create);
router.put('/:id', postController.update);
router.get('/', postController.getAll);
router.get('/health', postController.healthCheck);


export default router;