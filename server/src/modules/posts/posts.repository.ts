import { Post } from "../../../generated/prisma/client";
import { IPostRepository } from "./posts.interface";
import { prisma } from "../../../lib/prisma";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";

export class PostRepository implements IPostRepository {

  async getAll(userId: number, limit: number, skip: number): Promise<Post[]> {
    // TODO: order by creaetedAt
    const posts = await prisma.post.findMany({
      skip,
      take: limit,
      orderBy: {
        id: 'desc'
      }
    })

    return posts
  }

  async create(userId: number, { title, description }: CreatePostDto): Promise<Post> {
    return await prisma.post.create({
      data: {
        title: title ?? undefined,
        description: description,
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

  async delete(id: number): Promise<Post> {
    return await prisma.post.delete({
      where: {
        id
      }
    })
  }

  async show(id: number): Promise<Post | null> {
    return await prisma.post.findUnique({
      where: {
        id
      }
    })
  }

  async total(userId: number): Promise<number> {
    return await prisma.post.count({
      where: {
        userId
      }
    })
  }

}