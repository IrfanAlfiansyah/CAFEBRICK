const express = require("express");
//const res = require("express/lib/response");
//import package express
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");
//const mainRouter = require("./src/routes");

//create express app
const server = express();
const PORT = 8080;

//jika db berhasil connect maka jalankan server
db.connect()
  .then(() => {
    console.log("DB Connected");
    //pasang router ke server
    server.use(mainRouter);

    //run server at port
    server.listen(PORT, () => {
      console.log(`Server is Running at Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

