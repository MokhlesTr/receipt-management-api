const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
    error: 'The requested route does not exist'
  });
};

module.exports = notFound;
