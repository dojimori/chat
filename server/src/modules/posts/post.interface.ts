import { Post } from "../../../generated/prisma/client";
import { CreatePostDto } from "./dtos/create.dto";

export interface IPostRepository {
  getAll(): Promise<Post[] | null>;
  create(payload: CreatePostDto): Promise<Post>;
  update(id: number, payload: any): Promise<Post>;
}