import { User } from "../../../generated/prisma/client";

export interface IAuthRepository {
  register(payload: any): Promise<User>;
  login(payload: any): any;
}