import { NextFunction } from "express";
import { validate } from "class-validator";
import { User, UserRole } from "../model/User";
import { HttpException } from "../../common/mids/errorHandler";
import { UserDto, EditPasswordDto } from "../dto/UserDto";
import BaseService from "../../common/service/BaseService";

const { ADMIN } = UserRole;


class UserService extends BaseService<User> {

  private static instance: UserService;
  private constructor() {
    super(User);
  }
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async newUser(dto: UserDto, next: NextFunction, errorMessage?: string) {
    const user: User = new User();
    user.username = dto.username;
    user.password = dto.password;
    
    // !! by default user role are USER
    if (dto.role && dto.role == "Admin")
      user.role = ADMIN;

    const errors = await validate(user);
    if (errors.length > 0) {
      next(new HttpException(400, " new user error validte TODO"));
      return;
    }

    user.hashPassword();

    const newUser: User = await this.save(user, next);
    return newUser;
  }

  public async editPassword(dto: EditPasswordDto, next: NextFunction) {

    // TODO: validate dto with class validator
    if (!(dto.oldPassword && dto.newPassword)) {
      next(new HttpException(400, " old or new password miss TODO"));
      return;
    }

    const user: User = await this.getById(dto.userId, next);
    if (!user) return;

    if (!user.checkIfUnencryptedPasswordIsValid(dto.oldPassword)) {
      next(new HttpException(401, "old password dont match"));
      return;
    }

    user.password = dto.newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      next(new HttpException(400, " edit password error validte TODO"));
      return;
    }
    user.hashPassword();

    const editUser: User = await this.save(user, next);

    return editUser;
  }
}
export default UserService;
