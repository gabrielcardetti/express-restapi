
import { Request, Response, NextFunction } from "express";

import { User } from "../model/User";
import UserService from "../services/UserService";
import { UserDto, EditPasswordDto } from "../dto/UserDto";


class UserController {

  static listAll = async (req: Request, res: Response, next: NextFunction) => {
    const userService: UserService = UserService.getInstance();
    const users = await userService.getAll(next);
    if (users)
      res.status(200).send({ users });
  };

  static getOneById = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.params.id;

    const userService: UserService = UserService.getInstance();
    const user = await userService.getPlain(id, next);
    if (user)
      res.send(user);
  };

  static newUser = async (req: Request, res: Response, next: NextFunction) => {
    const dto = req.body as UserDto;

    const userService: UserService = UserService.getInstance();
    const newUser = userService.newUser(dto, next);

    if (newUser)
      res.status(201).send({ message: "User created" });
  };

  static editUser = async (req: Request, res: Response, next: NextFunction) => {

  };

  static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.params.id;

    const userService: UserService = UserService.getInstance();
    const user: User = await userService.getById(id, next);
    if (!user) return;

    const deleteUser = await userService.softDelete(user.id, next);

    if (deleteUser)
      res.status(204).send();
  };

  static editPassword = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = res.locals.jwtPayload.userId;

    const dto = req.body as EditPasswordDto;
    dto.userId = id;

    const userService: UserService = UserService.getInstance();
    const editUser = await userService.editPassword(dto, next);
    if (editUser)
      res.status(204).send();
  };

};

export { UserController };
