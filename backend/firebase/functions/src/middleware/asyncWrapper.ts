import { NextFunction, Request, RequestHandler, Response } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default (handler: AsyncRequestHandler): RequestHandler => {
  return (req, res, next) => {
    return handler(req, res, next).catch((error) => {
      console.log(error);

      return res.status(404).json({ error });
    });
  };
};
