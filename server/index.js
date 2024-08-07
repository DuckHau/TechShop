import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import dbConnect from "./dbConnect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errHandler.js";
import bodyParser from "body-parser";
const app = express();

// configure dotenv
dotenv.config();

// Connect to MongoDB
dbConnect();

//test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
    preflightContinue: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Routes
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);

app.use(errorHandler);

app.set("view engine", "pug");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
