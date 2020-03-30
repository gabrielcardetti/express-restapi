import { NextFunction, Request, Response } from 'express';

class HttpException extends Error {
  status: number;
  message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}


const errorMiddleware = (error: HttpException, request: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).send({ status, message })
}

export { errorMiddleware, HttpException };