const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const formidableMiddleware = require("express-formidable");

const cookieparser = require("cookie-parser");
const { connectMongodb } = require("./config/connection");
const { productModel } = require("./models/Fashion");
const { routers } = require("./routes/card");
const { middleware } = require("./middleware/middleware.js");
const { catRouter } = require("./routes/category");
const { userRoute } = require("./routes/User");
const { routes } = require("./routes/UserProfile");
const dotenv = require("dotenv");
const formidable = require("express-formidable");
const { productRoute } = require("./routes/Product");
const { paymentRoute } = require("./routes/payment");
const path = require("path");
const { orderRoute } = require("./routes/Order");
const app = express();
dotenv.config();
app.use(cookieparser());
//connection
connectMongodb(process.env.DB_URL).then(() => {
  console.log("connected");
});
app.use(cors());
app.use(express.static(path.join(__dirname, "./frontend/build")));
// app.use(temp);
// app.use(middleware);
// app.use(formidable());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/card", routers);
app.use("/category", catRouter);
app.use("/signup", userRoute);
app.use("/userProfile", routes);
app.use("/product", productRoute);
app.use("/payment", paymentRoute);
app.use("/order", orderRoute);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});
app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});
