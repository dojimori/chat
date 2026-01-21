import { Post } from "../../../generated/prisma/client";
import { IPostRepository } from "./posts.interface";
import { prisma } from "../../../lib/prisma";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";

export class PostRepository implements IPostRepository {

  async getAll(): Promise<Post[] | null> {
    return await prisma.post.findMany({});
  }

  async create(userId: number, { title, description }: CreatePostDto): Promise<Post> {
    return await prisma.post.create({
      data: {
        title: title ?? undefined,
        description: description ?? undefined,
        user: {
          connect: { id: userId }
        }
      },
    })
  }

  async update(id: number, { title, description }: UpdatePostDto): Promise<Post> {
    return await prisma.post.update({
      where: {
        id
      },
      data: {
        title: title ?? undefined,
        description
      }
    })
  }
}