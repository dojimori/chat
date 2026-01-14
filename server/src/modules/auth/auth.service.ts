import { User } from "../../../generated/prisma/client";
import authRepository from "./auth.repository";
import { RegisterDto } from "./dto/register.dto";
import bcrypt from "bcryptjs"
import userRepository from "../users/user.repository";
import { LoginDto } from "./dto/login.dto";
import userService from "../users/user.service";
import { AppError } from "../../errors/app.error";

class AuthService {
  async register(payload: RegisterDto): Promise<User | undefined> {
    const { username, password, passwordConfirmation } = payload;
    if (!username || !password || !passwordConfirmation) {
      throw new AppError("Please fill in missing fields", 409);
    }

    if (password !== passwordConfirmation) {
      throw new AppError("Passwords does not match", 409);
    }

    if (password.length < 6) {
      throw new AppError("Password must be atleast 6 characters", 409);
    }

    try {
      const existingUser = await userRepository.findByUsername(username);

      if (existingUser) {
        throw new AppError("Username already taken", 409);
      }

      const user = await authRepository.register({ username, password });

      return user;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
  

  // TODO refactor error handling lmao
  async login(payload: LoginDto) {
    try {
      const { username, password } = payload;
      if (!username || !password) {
        throw new Error("Please fill in missing fields..");
      }
      
      const user = await userService.findByUsername(username);

      if (!user) {
        // TODO refactor: throw new AppError with status 409
        throw new Error(`Invalid account.`)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        // TODO refactor: throw new AppError with status 409
        throw new Error(`Invalid account.`)
      }

      return user;
    } catch (error: any) {
        throw new Error(`Error logging in: ${error.message}`)
    }

  }
}

export default new AuthService();