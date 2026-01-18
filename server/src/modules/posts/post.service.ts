import { CreatePostDto } from "./dtos/create.dto";
import { IPostRepository } from "./post.interface";

export class PostService {
  constructor(private readonly postRepo: IPostRepository) { };

  async create(payload: CreatePostDto) {
    const post = await this.postRepo.create(payload);
    return post;
  }

}