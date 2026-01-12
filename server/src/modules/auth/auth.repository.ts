import { IAuthRepository } from "./auth.interface";
import { User } from "../../../generated/prisma/client";
import { RegisterDto } from "./dto/register.dto";
import { prisma } from "../../../lib/prisma";

class AuthRepository implements IAuthRepository {
  async register(payload: RegisterDto): Promise<User> {
    try {
      const user = await prisma.user.create({
        data: payload
      });

      return user;
    } catch(error) {
      throw new Error(`Error register: ${error}`)
    }

  }

  login(payload: any) {
    
  }
}

export default new AuthRepository();