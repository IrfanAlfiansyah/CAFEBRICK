const db = require("../config/db");
const products = [
  {
    id: 1,
    menu: "Caramel Biscuit",
    category: "Drink",
    size: "R",
    price: 30000,
  },
  {
    id: 2,
    menu: "Caramel Biscuit",
    category: "Drink",
    size: "L",
    price: 35000,

  },
  {
    id: 3,
    menu: "Caramel Biscuit",
    category: "Drink",
    size: "XL",
    price: 40000,

  }, {
    id: 4,
    menu: "Choco Oreo",
    category: "Drink",
    size: "R",
    price: 27000,

  }, {
    id: 5,
    menu: "Choco Oreo",
    category: "Drink",
    size: "L",
    price: 32000,

  }, {
    id: 6,
    menu: "Choco Oreo",
    category: "Drink",
    size: "XL",
    price: 37000,

  }, {
    id: 7,
    menu: "Cold Brew",
    category: "Drink",
    size: "R",
    price: 30000,

  }, {
    id: 8,
    menu: "Cold Brew",
    category: "Drink",
    size: "L",
    price: 35000,

  }, {
    id: 9,
    menu: "Cold Brew",
    category: "Drink",
    size: "XL",
    price: 40000,

  }, {
    id: 10,
    menu: "Creamy Ice Coffee",
    category: "Drink",
    size: "R",
    price: 27000,

  }, {
    id: 11,
    menu: "Creamy Ice Coffee",
    category: "Drink",
    size: "L",
    price: 32000,

  }, {
    id: 12,
    menu: "Creamy Ice Coffee",
    category: "Drink",
    size: "XL",
    price: 37000,

  }, {
    id: 13,
    menu: "Creamy Ice Latte",
    category: "Drink",
    size: "R",
    price: 27000,

  }, {
    id: 14,
    menu: "Creamy Ice Latte",
    category: "Drink",
    size: "L",
    price: 32000,

  }, {
    id: 15,
    menu: "Creamy Ice Latte",
    category: "Drink",
    size: "XL",
    price: 37000,

  }, {
    id: 16,
    menu: "Hazelnut Latte",
    category: "Drink",
    size: "R",
    price: 25000,

  }, {
    id: 17,
    menu: "Hazelnut Latte",
    category: "Drink",
    size: "L",
    price: 30000,

  }, {
    id: 18,
    menu: "Hazelnut latte",
    category: "Drink",
    size: "XL",
    price: 40000,

  }, {
    id: 19,
    menu: "Beef Spaghetti",
    category: "Food",
    size: "R",
    price: 44000,

  }, {
    id: 20,
    menu: "Chicken Fire Wing",
    category: "Food",
    size: "R",
    price: 45000,

  }, {
    id: 21,
    menu: "Drum Sticks",
    category: "Food",
    size: "R",
    price: 30000,

  }, {
    id: 22,
    menu: "Mix Snack",
    category: "Food",
    size: "R",
    price: 34000,

  }, {
    id: 23,
    menu: "Salty Rice",
    category: "Food",
    size: "R",
    price: 20000,

  }, {
    id: 24,
    menu: "Spicy Chicken",
    category: "Food",
    size: "R",
    price: 30000,

  }, {
    id: 25,
    menu: "Summer Fried Rice",
    category: "Food",
    size: "R",
    price: 32000,

  }, {
    id: 26,
    menu: "Veggie Tomato Mix",
    category: "Food",
    size: "R",
    price: 34000,

  },
];

const getProductsFromServer = () => {
  return new Promise((resolve, reject) => {
    // let err = false;
    // if (err) return reject({
    //   err: new Error(err),
    //   status: 500,
    // });
    // return resolve(products);
    db.query("SELECT * FROM public.products")
      .then(result => {
        const response = {
          total: result.rowCount,
          data: result.rows,
        }
        resolve(response);
      })
      .catch((err) => {
        reject({status: 500, err}); 
      });
  });
};

const getSingleProductFromServer = (id) => {
  return new Promise((resolve, reject) => {
    let err = false;
    const product = products.filter((product) => product.id === id);
    if (err)
      return reject({
        err: new Error(err),
        status: 500,
      });
    if (product.length === 0)
      return reject({
        err: new Error("Product not Found"),
        status: 404,
      });
    return resolve(product);
  });
};

module.exports = {
  getProductsFromServer,
  getSingleProductFromServer,
}