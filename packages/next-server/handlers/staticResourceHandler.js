const staticResourceHandler = (req, res, nextHandler) => {
  res.header('cache-control', 'public, max-age=31536000, immutable');
  nextHandler();
};

module.exports =  staticResourceHandler;
