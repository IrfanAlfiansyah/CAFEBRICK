const validate = {};
validate.queryFind = (req, res, next) => {
  const {query} = req;
  const validQuery = Object.keys(query).filter(
    (key) => key === "category" || key === "sort" || key === "order"
  );
  if (validQuery.length < 3) {
    return res.status(400).json({
      err: "Query harus berisikan category, sort, dan order",
    });
  }
  next();
};

validate.productData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "menu" || key === "category" || key === "size" || key === "price"
  );
  if (validBody.length < 4) {
    return res.status(400).json({
      err: "Body harus berisikan menu, category, size, dan price",
    });
  }
  next();
};
module.exports = validate;