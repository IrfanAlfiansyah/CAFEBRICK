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

validate.userData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "displayName" || key === "email" || key === "phoneNumber" || key === "address"
  );
  if (validBody.length < 4) {
    return res.status(400).json({
      err: "Body harus berisikan displayName, email, phoneNumber, dan address",
    });
  }
  next();
};

validate.promotionData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "promotionCode" || key === "detailPromo" || key === "discount"
  );
  if (validBody.length < 3) {
    return res.status(400).json({
      err: "Body harus berisikan promotionCode, detailPromo, dan discount",
    });
  }
  next();
};

validate.transactionData = (req, res, next) => {
  const {body} = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "nameProduct" || key === "quantity" || key === "size" || key === "subTotal" || key === "shipping" || key === "tax" || key === "total" || key === "address"
  );
  if (validBody.length < 3) {
    return res.status(400).json({
      err: "Body harus berisikan nameProduct, quantity, size, subTotal, shipping, tax, total, dan address",
    });
  }
  next();
};

module.exports = validate;