import { Request, Response } from 'express';

export interface IExpressContext {
  res: Response;
  req: Request;
}
