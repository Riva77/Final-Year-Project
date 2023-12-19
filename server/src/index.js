require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const loginRoutes = require("./routes/authentication/login.js");
const registerRoutes = require("./routes/authentication/register.js");

connection();
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

//middlewares
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);

app.listen(8000, () => {
  //setting up the server to listen on the port 8000
  console.log("listening on port 8000");
});
