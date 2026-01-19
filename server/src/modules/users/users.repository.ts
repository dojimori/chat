import { Profile, User } from "../../../generated/prisma/client";
import { IUserRepository } from "./users.interface";
import { prisma } from "../../../lib/prisma";
import { CreateUserDto } from "./dto/create.dto";

export class UserRepository implements IUserRepository {
  async create(payload: CreateUserDto): Promise<User> {
    return await prisma.user.create({
      data: payload,
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdWithProfile(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    })
  }

  async upsertProfile({
    displayName,
    aboutMe,
    gender,
    country,
    likes,
    dislikes,
    relationship,
    profilePicture,
  }: Profile,
    userId: number
  ): Promise<Profile> {
    return await prisma.profile.upsert({
      where: { userId },
      create: {
        displayName: displayName ?? undefined,
        profilePicture: profilePicture ?? undefined,
        gender: gender ?? undefined,
        aboutMe: aboutMe ?? undefined,
        likes: likes ?? undefined,
        dislikes: dislikes ?? undefined,
        country: country ?? undefined,
        relationship: relationship ?? undefined,
        user: {
          connect: { id: userId },
        },
      },
      update: {
        displayName: displayName ?? undefined,
        profilePicture: profilePicture ?? undefined,
        gender: gender ?? undefined,
        aboutMe: aboutMe ?? undefined,
        likes: likes ?? undefined,
        dislikes: dislikes ?? undefined,
        relationship: relationship ?? undefined,
        country: country ?? undefined,
      },
    });
  }
}
