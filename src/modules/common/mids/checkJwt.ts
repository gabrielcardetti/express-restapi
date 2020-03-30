
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../../../../config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  try {
    token = req.headers.authorization;

    token = token.split(' ')[1];   // token = Bearear TOKEN 
  } catch (error) {
    res.status(401).send({ error: 'dont have token' });
  }
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({ error });
    return;
  }

  //TODO: check this
  // const { userId, username } = jwtPayload;
  // const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
  //   expiresIn: "1h"
  // });
  // res.setHeader("token", newToken);

  //Call the next middleware or controller
  next();
};
