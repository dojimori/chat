import { Post } from "../../../generated/prisma/client";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";

export interface IPostRepository {
  getAll(
    userId: number,
    page?: number,
    limit?: number,
    skip?: number
  ): Promise<Post[]>;
  create(userId: number, payload: CreatePostDto): Promise<Post>;
  update(id: number, payload: UpdatePostDto): Promise<Post>;
  delete(id: number): Promise<Post>;
  show(id: number): Promise<Post | null>;
  total(userId: number): Promise<number>;
}

// export interface PostPaginate {
//   posts: Post[];
//   total: number;
// }
