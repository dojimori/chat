import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";
import { PostService } from "./posts.service";
import { Request, Response } from 'express'

export class PostController {
  constructor(private readonly postService: PostService) { }

  healthCheck = (req: Request, res: Response) => {
    return res.status(200).send('ok')
  }

  getAll = async (req: Request, res: Response) => {
    const posts = await this.postService.getAll()

    return res.status(200).json({ posts })
  }

  create = async (req: Request<{}, {}, CreatePostDto>, res: Response) => {
    const userId = (req as any).userId || 1;
    const post = await this.postService.create(userId, req.body);

    return res.status(201).json({ message: 'Post created successfully', post })
  }

  update = async (req: Request, res: Response) => {
    const payload: UpdatePostDto = req.body;
    const id = parseInt(req.params.id);
    const post = await this.postService.update(id, payload)

    return res.status(200).json({ message: 'Post updated successfully', post })
  }

  delete = async (req: Request, res: Response) => {
    const post = await this.postService.delete(parseInt(req.params.id));

    return res.status(200).json({ message: 'Post deleted successfully', post })
  }
}