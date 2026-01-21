import { Post } from "../../../generated/prisma/client";
import { IPostRepository } from "./posts.interface";
import { prisma } from "../../../lib/prisma";
import { CreatePostDto } from "./dtos/create.dto";
import { UpdatePostDto } from "./dtos/update.dto";
import { PostPaginate } from "./posts.interface";

export class PostRepository implements IPostRepository {

  async getAll(userId: number, limit: number, skip: number): Promise<Post[] | PostPaginate> {
    // TODO: order by creaetedAt
    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          id: 'desc'
        }
      }),

      prisma.post.count()
    ])

    const paginate: PostPaginate = { posts, total }
    return paginate
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

}