import userRepository from "./user.repository";
import { prisma } from "../../../lib/prisma";
import { User } from "../../../generated/prisma/client";

class UserService {
  async findByUsername(username: string): Promise<User | null> {
    // return await prisma.user.findFirst({
    //   where: {username}
    // })
    try {
      const user = await userRepository.findByUsername(username)

      return user;
    } catch(error) {
      throw new Error(`Error finding user by username: ${error}`)
    }
  }
}

export default new UserService(); 