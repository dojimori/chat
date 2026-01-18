import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService) { };

  /**
   *
   * @param req
   * @param res
   * @route /api/users/
   * @returns status 200
   */
  me = async (req: Request, res: Response) => {
    const userId = (req as any).userId;

    const user = await this.userService.findByIdWithProfile(userId);

    return res.status(200).json({ user });
  }

  /**
   *
   * @param req
   * @param res
   * @route /api/users/profile
   * @returns status 200
   */
  updateProfile = async (req: Request, res: Response) => {
    const isAuth = req.session.user;

    if (!isAuth) {
      return res.status(403);
    }

    const file = (req as any).file;
    const profilePicture = file ? `/uploads/profiles/${file.filename}` : undefined;
    await this.userService.upsertProfile({ ...req.body, profilePicture }, isAuth.id);
    const user = await this.userService.findByIdWithProfile(isAuth.id);

    res.status(200).json({ user });
  }
}
