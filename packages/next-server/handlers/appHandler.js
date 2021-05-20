const appHandler = (nextApp, pageName) => (req, res) => {
  const query = {
    ...req.params,
    ...req.query,
  };

  res.header('cache-control', 'private, no-cache, max-age=0');
  return nextApp.render(req, res, pageName, query);
};

module.exports =  appHandler;
