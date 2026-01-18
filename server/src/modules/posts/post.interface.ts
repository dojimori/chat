import { Post } from "../../../generated/prisma/client";
import { CreatePostDto } from "./dtos/create.dto";

export interface IPostRepository {
  create(payload: CreatePostDto): Promise<Post>;
}