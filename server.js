import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/route.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

const app = express();
// const port = 4000;

// middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors());


// REQUIRED FOR MULTER FILE HANDLING

// db connection
connectDB();

// Api endPoints

app.use("/api/user",userRoute)
app.use("/api/food",foodRouter)
app.use("/image",express.static('uploads'))
app.use("/api/food/",orderRoute)
app.use("/api/cart/",cartRouter)

app.get("/", (req, res) => {
  res.send("API is Working...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is working on port ${port}`);
});

