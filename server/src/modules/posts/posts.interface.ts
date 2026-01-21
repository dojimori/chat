import { Post } from "../../../generated/prisma/client";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";

export interface IPostRepository {
  getAll(): Promise<Post[] | null>;
  create(userId: number, payload: CreatePostDto): Promise<Post>;
  update(id: number, payload: UpdatePostDto): Promise<Post>;
}