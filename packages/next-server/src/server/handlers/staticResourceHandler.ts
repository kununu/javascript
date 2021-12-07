const staticResourceHandler = (req: any, res: any, nextHandler: any): void => {
  res.header('cache-control', 'public, max-age=31536000, immutable');
  nextHandler();
};

export default staticResourceHandler;
