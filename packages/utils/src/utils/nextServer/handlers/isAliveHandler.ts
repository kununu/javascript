import {Request, Response} from 'express';

const isAliveHandler = (req: Request, res: Response): void => {
  res.header('cache-control', 'private, no-cache, max-age=0'); // ETOE-TEST

  res.json({build: process.env.BUILD_NAME || 'local development'});
};

export default isAliveHandler;
