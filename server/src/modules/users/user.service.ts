import { UserRepository } from "./user.repository";
import { Profile } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/app.error";

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async create(payload: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const user = await this.userRepository.create({ ...payload, password: hashedPassword });
    return user;
  }
  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);

    }

    const { password, ...safeUser } = user;
    return safeUser;
  }

  async findByIdWithProfile(id: number) {
    const user = await this.userRepository.findByIdWithProfile(id);
    if (!user) {
      throw new AppError('User not found', 404);

    }
    const { password, ...safeUser } = user;
    return safeUser;
  }

  async upsertProfile(
    payload: Profile,
    userId: number
  ) {
    // TODO: check aboutMe, likes, and dislikes length if it exceeds to 200 characters
    await this.userRepository.upsertProfile(payload, userId);

  }
}

// export default new UserService();
