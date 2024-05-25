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
const getSalesByMonth = require("./routes/order/getSalesByMonth.js");
const getBlogStats = require("./routes/blog/getBlogStats.js");
const getOrderStats = require("./routes/order/getOrderStats.js");
const deleteBlog = require("./routes/blog/deleteBlog.js");
const updateOrderStatus = require("./routes/order/updateOrderStatus.js");
const updateCartItemRoutes = require("./routes/cart/updateCartItem.js");
const deleteCartItemRoutes = require("./routes/cart/deleteCartItem.js");
const verifyUser = require("./routes/authentication/verify.js");
const {
  protectAdmin,
  protect,
} = require("./middlewares/authorization.middleware.js");

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
app.use("/api/addProduct", protectAdmin, addProductRoutes);
app.use("/api/getProduct", getProductRoutes);
app.use("/api/getSingleProduct", getSingleProductRoutes);
app.use("/api/addAuthor", protectAdmin, addAuthorRoutes);
app.use("/api/getAuthor", getAuthorRoutes);
app.use("/api/addGenre", addGenreRoutes);
app.use("/api/getGenre", getGenreRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/getUser", getUserRoutes);
app.use("/api/addCartItem", protect, addCartItemRoutes);
app.use("/api/getCartItem", protect, getCartItemRoutes);
app.use("/api/createOrder", protect, createOrderRoutes);
app.use("/api/getOrder", protectAdmin, getOrderRoutes);
app.use("/api/createPost", protect, createPostRoutes);
app.use("/api/getApprovedPost", getApprovedPostRoutes);
app.use("/api/getSinglePost", getSinglePostRoutes);
app.use("/api/getTopProducts", getTopProducts);
app.use("/api/addFavouriteBook", protect, addFavouriteBook);
app.use("/api/updateOrder", protect, updateOrderRoutes);
app.use("/api/deleteOrder", protect, deleteOrderRoutes);
app.use("/api/deleteProduct", deleteProductRoutes);
app.use("/api/khalti/callback", paymentRoutes);
app.use("/api/getUserOrder", protect, getUserOrderRoutes);
app.use("/api/getOrderById", protect, getOrderByIdRoutes);
app.use("/api/sendEmail", sendEmailRoutes);
app.use("/api/resetpassword", resetPasswordRoutes);
app.use("/api/updateProduct", protectAdmin, updateProductRoutes);
app.use("/api/approveBlog", protectAdmin, approveBlogRoutes);
app.use("/api/getAllBlogs", getAllBlogRoutes);
app.use("/api/getTopAuthors", getTopAuthors);
app.use("/api/changePassword", protect, changePasswordRoutes);
app.use("/api/editProfile", protect, editProfileRoutes);
app.use("/api/getUserBlog", protect, getUserBlogRoutes);
app.use("/api/getSalesByMonth", protectAdmin, getSalesByMonth);
app.use("/api/getBlogStats", protectAdmin, getBlogStats);
app.use("/api/getOrderStats", protectAdmin, getOrderStats);
app.use("/api/deleteBlog", protect, deleteBlog);
app.use("/api/updateOrderStatus", updateOrderStatus);
app.use("/api/updateCartItem", protect, updateCartItemRoutes);
app.use("/api/deleteCartItem", protect, deleteCartItemRoutes);
app.use("/api/verify", verifyUser);

app.listen(8000, () => {
  //setting up the server to listen on the port 8000
  console.log("listening on port 8000");
});
