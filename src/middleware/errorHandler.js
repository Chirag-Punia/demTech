export const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  res.status(500).json({
    error: {
      code: 'InternalFailure',
      message: 'The request processing failed because of an internal error',
      requestId: req.headers['x-amzn-requestid'] || 'unknown'
    }
  });
};