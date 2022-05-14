const response = {};
response.successResponse = (res, status, data, meta) => {
  res.status(status).json({
    err: null,
    data,
    meta,
  });
};

response.errorResponse = (res, status, err) => {
  res.status(status).json({
    data: [],
    err,
  });
};

module.exports = response;
