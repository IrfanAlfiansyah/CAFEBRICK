const response = {};
response.successResponse = (res, status, data, total) => {
  res.status(status).json({
    err: null,
    data,
    total,
  });
};

response.errorResponse = (res, status, err) => {
  res.status(status).json({
    data: [],
    err,
  });
};

module.exports = response;