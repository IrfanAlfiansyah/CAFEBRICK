require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const res = require("express/lib/response");
//import package express
const mainRouter = require("./src/routes/index");
const db = require("./src/config/db");
//const mainRouter = require("./src/routes");
const logger = require("morgan");

//create express app
const server = express();
const PORT = 8080;

//jika db berhasil connect maka jalankan server
db.connect()
  .then(() => {
    console.log("DB Connected");
    //pasang router ke server

    server.use(
      logger(":method :url :status :res[content-length] - :response-time ms")
    );
    
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());

    //pasang cors
    const corsOptions = {
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowed: ["Content-Type", "Authorization"],
    };
    server.use(cors(corsOptions));

    server.use(express.static("public"));

    server.use(mainRouter);

    //run server at port
    server.listen(PORT, () => {
      console.log(`Server is Running at Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

