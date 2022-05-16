const validate = {};
validate.queryFind = (req, res, next) => {
  const { query } = req;
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
  const { body } = req;
  console.log(body);
  const validBody = Object.keys(body).filter(
    (key) =>
      key === "menu" ||
      key === "category" ||
      key === "size" ||
      key === "price" 
  );
  console.log(validBody.length);
  if (validBody.length < 4) {
    return res.status(400).json({
      err: "Body harus berisikan menu, category, size, price",
    });
  }
  next();
};

validate.userData = (req, res, next) => {
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) =>
      key === "display_name" ||
      key === "email" ||
      key === "phone_number" ||
      key === "address"
  );
  if (validBody.length < 4) {
    console.log(validBody);
    return res.status(400).json({
      err: "Body harus berisikan display_name, email, phone_number, dan address",
    });
  }
  next();
};

validate.promotionData = (req, res, next) => {
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) =>
      key === "promotion_code" || key === "detail_promo" || key === "discount"
  );
  if (validBody.length < 3) {
    return res.status(400).json({
      err: "Body harus berisikan promotion_code, detail_promo, dan discount",
    });
  }
  next();
};

validate.transactionData = (req, res, next) => {
  const { body } = req;
  console.log(body);
  const validBody = Object.keys(body).filter(
    (key) =>
      key === "product_id" ||
      key === "quantity" ||
      key === "size" ||
      key === "sub_total" ||
      key === "shipping" ||
      key === "total" ||
      key === "address" ||
      key === "tax"
  );
  if (validBody.length < 8) {
    return res.status(400).json({
      err: "Body harus berisikan product_id, quantity, size, sub_total, shipping, total, address, dan tax",
    });
  }
  next();
};

validate.searchProduct = (req, res, next) => {
  const {name, id_category, sort, order} = req.query;
  if(name){
      if(typeof name !== "string"){
          return res.status(400).json({
              error: "Invalid input name!"
          });
      }
  }
  if(id_category){
      if( id_category !== "1" && id_category !== "2" && id_category !== "3"){
          return res.status(400).json({
              error: "Invalid input id_category!"
          });
      }
  }
  if(sort){
      if(sort !== "price" && sort !== "input_time" && sort !== "favorites" && sort !== "id"){
          return res.status(400).json({
              error: "Invalid input sort!"
          });
      }
  }
  if(order){
      if( order !== "asc" && order !== "desc"){
          return res.status(400).json({
              error: "Invalid input order!"
          });
      }      
  }
  next();
};

validate.authRegister = (req, res, next) => {
  const { body } = req;
  const validBody = Object.keys(body).filter(
    (key) => key === "email" || key === "pass"
  );
  if (
    validBody.email.value === "" ||
    validBody.email.value.indexOf("@") === -1
  ) {
    return res.status(403).json({
      err: "You Have To Write a Valid Email Address.",
    });
  }
  if (validBody.pass.value === "" || validBody.pass.length >= 8) {
    return res.status(403).json({
      err: "Password Must Be More Than Or Equal To 8 Digits.",
    });
  }
  next();
};

module.exports = validate;
