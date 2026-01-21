import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";
import { PostService } from "./posts.service";
import { Request, Response } from "express";

export class PostController {
  constructor(private readonly postService: PostService) { }

  /**
   * @route GET /api/posts/health 
   * @returns status -> 200 "OK"
   */
  healthCheck = (req: Request, res: Response) => {
    return res.status(200).send("ok");
  };

  /**
   * @route GET /api/posts || /api/posts?page=1&limit=10
   * @query page (default 1)
   * @query limit (default 10)
   * @returns status -> 200, body -> { posts: [] }
   */

  index = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const page = parseInt(req.query.page as any) || 1;
    const limit = parseInt(req.query.limit as any) || 10;
    const skip = (page - 1) * limit;

    const posts = await this.postService.getAll(userId, limit, skip);

    return res.status(200).json({ ...posts });
  };

  /**
   * @route POST /api/posts
   * @body CreatePostDto
   * @returns status -> 201, body -> { message: ..., post: ... }
   */
  create = async (req: Request<{}, {}, CreatePostDto>, res: Response) => {
    const userId = (req as any).userId;
    const post = await this.postService.create(userId, req.body);

    return res.status(201).json({ message: "Post created successfully", post });
  };

  /**
   * @route PUT /api/posts/:id
   * @param id  
   * @returns status -> 200, body -> { message: ..., post: ... }
   */
  update = async (req: Request, res: Response) => {
    const payload: UpdatePostDto = req.body;
    const id = parseInt(req.params.id);
    const post = await this.postService.update(id, payload);

    return res.status(200).json({ message: "Post updated successfully", post });
  };

  /**
   * @route DELETE /api/posts/:id
   * @param id
   * @returns status -> 200, body -> { message: ..., post: ... }
  */
  delete = async (req: Request, res: Response) => {
    const post = await this.postService.delete(parseInt(req.params.id));

    return res.status(200).json({ message: "Post deleted successfully", post });
  };
}
