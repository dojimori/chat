import { AppError } from "../../errors/app.error";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";
import { IPostRepository } from "./posts.interface";

export class PostService {
  constructor(private readonly postRepo: IPostRepository) { };

  async getAll(userId: number, limit: number, skip: number) {
    const posts = await this.postRepo.getAll(userId, limit, skip);
    return posts
  }

  async create(userId: number, payload: CreatePostDto) {
    if (!payload.description) {
      throw new AppError('Description is required', 400)
    }

    const post = await this.postRepo.create(userId, payload);
    return post;
  }

  async update(id: number, payload: UpdatePostDto) {
    if (!payload.description) {
      throw new AppError('Description is required', 400)
    }
    const post = await this.postRepo.show(id);

    if (!post) {
      throw new AppError('Post not found', 404)
    }

    return await this.postRepo.update(id, payload);
  }

  async delete(id: number) {
    const post = await this.postRepo.show(id);

    if (!post) {
      throw new AppError('Post not found', 404)
    }

    return await this.postRepo.delete(id)
  }
}