const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
const errorMiddlerware = require("./middleware/error");
const path = require("path");
const cors = require("cors");
//config
dotenv.config({path:"backend/config/config.env"})

app.use(cors({credentials:true, origin:true, exposedHeaders: ["set-cookie"]}));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.set("trust proxy"); // trust first proxy


//Routes imports
const product = require("./routes/productRoute")
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// middleware for Errors
app.use(errorMiddlerware);


module.exports = app;