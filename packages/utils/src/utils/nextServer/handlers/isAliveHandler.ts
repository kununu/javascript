const isAliveHandler = (req: any, res: any): void => {
  res.header('cache-control', 'private, no-cache, max-age=0'); // ETOE-TEST

  res.json({build: process.env.BUILD_NAME || 'local development'});
};

export default isAliveHandler;
