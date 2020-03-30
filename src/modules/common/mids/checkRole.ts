import { Request, Response, NextFunction } from "express";

import { User, UserRole } from "../../user/model/User";
import UserService from "../../user/services/UserService";

export const checkRole = (roles: Array<UserRole>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userService = UserService.getInstance();
    const user: User = await userService.getById(id, next);
    
    if(user && roles.indexOf(user.role) > -1 ) next();
    else res.status(401).send();
  };
};
