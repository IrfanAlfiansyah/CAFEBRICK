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
    (key) => key === "menu" || key === "category" || key === "size" || key === "price" || key === "picture"
  );
  if (validBody.length < 5) {
    return res.status(400).json({
      err: "Body harus berisikan menu, category, size, price, picture",
    });
  }
  next();
};

validate.userData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "display_name" || key === "email" || key === "phone_number" || key === "address"
  );
  if (validBody.length < 4) {
    return res.status(400).json({
      err: "Body harus berisikan display_name, email, phone_number, dan address",
    });
  }
  next();
};

validate.promotionData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "promotion_code" || key === "detail_promo" || key === "discount"
  );
  if (validBody.length < 3) {
    return res.status(400).json({
      err: "Body harus berisikan promotion_code, detail_promo, dan discount",
    });
  }
  next();
};

validate.transactionData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "product_id" || key === "quantity" || key === "size" || key === "sub_total" || key === "shipping" || key === "tax" || key === "total" || key === "address"
  );
  if (validBody.length < 8) {
    return res.status(400).json({
      err: "Body harus berisikan product_id, quantity, size, sub_total, shipping, tax, total, dan address",
    });
  }
  next();
};

module.exports = validate;