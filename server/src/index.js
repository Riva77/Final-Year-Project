require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const loginRoutes = require("./routes/authentication/login.js");
const registerRoutes = require("./routes/authentication/register.js");
const addProductRoutes = require("./routes/product/addProduct.js");
const getProductRoutes = require("./routes/product/getProduct.js");
const getSingleProductRoutes = require("./routes/product/getSingleProduct.js");
const addAuthorRoutes = require("./routes/author/addAuthor.js");
const getAuthorRoutes = require("./routes/author/getAuthor.js");
const addGenreRoutes = require("./routes/genre/addGenre.js");
const getGenreRoutes = require("./routes/genre/getGenre.js");
const cloudinaryRoutes = require("../src/routes/cloudinary/cloudinary.js");
const fileUpload = require("express-fileupload");
const getUserRoutes = require("./routes/user/getUser.js");
const getCartItemRoutes = require("./routes/cart/getCartItem.js");
const addCartItemRoutes = require("./routes/cart/addCartItem.js");
const createOrderRoutes = require("./routes/order/createOrder.js");
const getOrderRoutes = require("./routes/order/getOrder.js");
const createPostRoutes = require("./routes/blog/createPost.js");
const getApprovedPostRoutes = require("./routes/blog/getApprovedPost.js");
const getSinglePostRoutes = require("./routes/blog/getSinglePost.js");
const getTopProducts = require("./routes/product/getTopProducts.js");
const addFavouriteBook = require("./routes/user/addFavouriteBook.js");
const deleteProductRoutes = require("./routes/product/deleteProduct.js");
const paymentRoutes = require("./routes/payment/payment.js");
const updateOrderRoutes = require("./routes/order/updateOrder.js");
const deleteOrderRoutes = require("./routes/order/deleteOrder.js");
const getUserOrderRoutes = require("./routes/order/getUserOrder.js");
const getOrderByIdRoutes = require("./routes/order/getOrderById.js");
const sendEmailRoutes = require("./routes/OTP/email.js");
const resetPasswordRoutes = require("./routes/user/resetPassword.js");
const updateProductRoutes = require("./routes/product/updateProduct.js");
const approveBlogRoutes = require("./routes/blog/approveBlog.js");
const getAllBlogRoutes = require("./routes/blog/getAllblogs.js");
const getTopAuthors = require("./routes/author/getTopAuthor.js");
const changePasswordRoutes = require("./routes/user/changePassword.js");
const editProfileRoutes = require("./routes/user/editProfile.js");
const getUserBlogRoutes = require("./routes/blog/getUserBlog.js");

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
app.use("/api/getSingleProduct", getSingleProductRoutes);
app.use("/api/addAuthor", addAuthorRoutes);
app.use("/api/getAuthor", getAuthorRoutes);
app.use("/api/addGenre", addGenreRoutes);
app.use("/api/getGenre", getGenreRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/getUser", getUserRoutes);
app.use("/api/addCartItem", addCartItemRoutes);
app.use("/api/getCartItem", getCartItemRoutes);
app.use("/api/createOrder", createOrderRoutes);
app.use("/api/getOrder", getOrderRoutes);
app.use("/api/createPost", createPostRoutes);
app.use("/api/getApprovedPost", getApprovedPostRoutes);
app.use("/api/getSinglePost", getSinglePostRoutes);
app.use("/api/getTopProducts", getTopProducts);
app.use("/api/addFavouriteBook", addFavouriteBook);
app.use("/api/updateOrder", updateOrderRoutes);
app.use("/api/deleteOrder", deleteOrderRoutes);
app.use("/api/deleteProduct", deleteProductRoutes);
app.use("/api/khalti/callback", paymentRoutes);
app.use("/api/getUserOrder", getUserOrderRoutes);
app.use("/api/getOrderById", getOrderByIdRoutes);
app.use("/api/sendEmail", sendEmailRoutes);
app.use("/api/resetpassword", resetPasswordRoutes);
app.use("/api/updateProduct", updateProductRoutes);
app.use("/api/approveBlog", approveBlogRoutes);
app.use("/api/getAllBlogs", getAllBlogRoutes);
app.use("/api/getTopAuthors", getTopAuthors);
app.use("/api/changePassword", changePasswordRoutes);
app.use("/api/editProfile", editProfileRoutes);
app.use("/api/getUserBlog", getUserBlogRoutes);

app.listen(8000, () => {
  //setting up the server to listen on the port 8000
  console.log("listening on port 8000");
});
