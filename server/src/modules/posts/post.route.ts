import { Router } from 'express'
import { PostRepository } from './post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { authMiddleware } from '../../middleware/auth.middleware';


const postRepo = new PostRepository()
const postService = new PostService(postRepo)
const postController = new PostController(postService)

const router = Router()

router.post('/', authMiddleware, postController.create);


export default router;