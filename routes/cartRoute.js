import { addToCart, removeFromCart, getCart } from "../controlllers/cartController.js"
import express from "express"
import authMiddleware from "../middleware/auth.js"

const cartRouter = express.Router()

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCart)
cartRouter.post("/get", authMiddleware, getCart)

export default cartRouter