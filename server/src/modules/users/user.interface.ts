import { User } from "../../../generated/prisma/client";

export interface IUserRepository {
  findByUsername(username: string): Promise<User|null>;
}