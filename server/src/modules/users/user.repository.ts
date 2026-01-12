import { User } from "../../../generated/prisma/client";
import { IUserRepository } from "./user.interface";
import { prisma } from "../../../lib/prisma";

class UserRepository implements IUserRepository {
  async findByUsername(username: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {username}
    })
  }
}

export default new UserRepository();