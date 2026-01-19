import { Post } from "../../../generated/prisma/client";
import { IPostRepository } from "./post.interface";
import { prisma } from "../../../lib/prisma";
import { CreatePostDto } from "./dtos/create.dto";

export class PostRepository implements IPostRepository {
  async create({ title, description }: CreatePostDto): Promise<Post> {
    return await prisma.post.create({
      data: {
        title: title ?? undefined,
        description,
        user: {
          connect: { id: 1 }
        }
      },
    })
  }

  async update(id: number, payload: any): Promise<Post> {
    return await prisma.post.update({
      where: {
        id
      },
      data: {
        ...payload
      }
    })
  }
}