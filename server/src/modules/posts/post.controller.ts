import { UpdatePostDto } from "./dtos/update.dto";
import { PostService } from "./post.service";
import { Request, Response } from 'express'

export class PostController {
  constructor(private readonly postService: PostService) { }


  getAll = async (req: Request, res: Response) => {
    return this.postService.getAll()
  }

  create = async (req: Request, res: Response) => {
    return await this.postService.create(req.body);
  }

  update = async (req: Request, res: Response) => {
    const payload: UpdatePostDto = req.body;
    return await this.postService.update(payload)
  }

}