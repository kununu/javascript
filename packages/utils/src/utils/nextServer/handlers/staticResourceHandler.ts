import {Request, Response, NextFunction} from 'express';

const staticResourceHandler = (req: Request, res: Response, nextHandler: NextFunction): void => {
  res.header('cache-control', 'public, max-age=31536000, immutable');
  nextHandler();
};

export default staticResourceHandler;
