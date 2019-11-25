const forwardParams = (req, res, next) => {
  req.forwardedParams = { ...req.params };
  next();
};

module.exports = {
  forwardParams
};
