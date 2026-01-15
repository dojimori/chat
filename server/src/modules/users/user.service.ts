import { UserRepository } from "./user.repository";
import { Profile } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";
import bcrypt from "bcryptjs";

export class UserService {
  constructor(private readonly userRepository: UserRepository){}

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
    const { password, ...safeUser } = await this.userRepository.findById(id);
    return safeUser;
  }

  async findByIdWithProfile(id: number) {
    const { password, ...safeUser } = await this.userRepository.findById(id, true);
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
