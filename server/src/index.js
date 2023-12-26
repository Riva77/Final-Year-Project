require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const loginRoutes = require("./routes/authentication/login.js");
const registerRoutes = require("./routes/authentication/register.js");
const addProductRoutes = require("./routes/product/addProduct.js");
const getProductRoutes = require("./routes/product/getProduct.js");
const addAuthorRoutes = require("./routes/author/addAuthor.js");
const getAuthorRoutes = require("./routes/author/getAuthor.js");
const addGenreRoutes = require("./routes/genre/addGenre.js");
const getGenreRoutes = require("./routes/genre/getGenre.js");
const cloudinaryRoutes = require("../src/routes/cloudinary/cloudinary.js");
const fileUpload = require("express-fileupload");

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
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));

app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/addProduct", addProductRoutes);
app.use("/api/getProduct", getProductRoutes);
app.use("/api/addAuthor", addAuthorRoutes);
app.use("/api/getAuthor", getAuthorRoutes);
app.use("/api/addGenre", addGenreRoutes);
app.use("/api/getGenre", getGenreRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

app.listen(8000, () => {
  //setting up the server to listen on the port 8000
  console.log("listening on port 8000");
});
