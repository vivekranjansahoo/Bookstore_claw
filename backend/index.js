const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const session = require("express-session");
const app = express();

//import routes

const bookRoutes = require("./routes/bookroute");

//middleware---------------------------------------------------------------------

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  session({
    secret: "mern",
    resave: false,
    saveUninitialized: true,
  })
);

//database connection mongodb-----------------------------------------------------------

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//testing------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send("welcome to bookstore project");
});

//all routes------------------------------------------------------------------------------

app.use("/api/v1/books", bookRoutes);

//listing the port for server--------------------------------------------------------

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
