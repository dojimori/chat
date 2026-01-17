import { Profile, User } from "../../../generated/prisma/client";
import { CreateUserDto } from "./dto/create.dto";

export interface IUserRepository {
  create(payload: CreateUserDto): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findByIdWithProfile(id: number): Promise<User | null>;
  upsertProfile(payload: Profile, userId: number): Promise<Profile>;
}
