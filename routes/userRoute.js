import express from "express";
import { userLogin, userSign } from "../controlllers/userController.js";


const userRoute = express.Router();

// User routes
userRoute.post("/sign", userSign)
userRoute.post("/login", userLogin)  // corrected here

export default userRoute