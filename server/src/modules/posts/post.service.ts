import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";
import { IPostRepository } from "./post.interface";

export class PostService {
  constructor(private readonly postRepo: IPostRepository) { };

  async create(payload: CreatePostDto) {
    const post = await this.postRepo.create(payload);
    return post;
  }

  async update(id: number, payload: UpdatePostDto) {
    const post = await this.postRepo.update(id, payload);
    return post;
  }
}