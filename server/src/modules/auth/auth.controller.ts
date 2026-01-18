import { Request, Response } from "express";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";


export class AuthController {
  constructor(private readonly authService: AuthService) { };


  /**
   * @route /api/auth/register
   * @param req
   * @param res
   * @returns status -> 201
   */
  register = async (req: Request, res: Response) => {
    await this.authService.register(req.body);
    res.status(201).json({ message: "Registered successfully, please login" });
  }

  /**
   * @route /api/auth/login
   * @param req
   * @param res
   * @returns status -> 200
   */
  login = async (req: Request, res: Response) => {
    const { user, accessToken } = await this.authService.login(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // set to true in production for HTTPS cookies
      maxAge: 1000 * 60 * 60, // 1 hour
      sameSite: true
    })

    // req.session.user = { id: user.id, username: user.username };
    res.status(200).json({ message: "Login successfully", user });
  }

  /**
   * @route /api/auth/logout
   * @param req
   * @param res
   * @returns status -> 204
   */
  logout = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    return res.status(200).json({});
  }
}