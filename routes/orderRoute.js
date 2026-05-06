import { listOrder, placeOrder, updateStatus, userOrder, verifyOrder } from "../controlllers/OrderController.js"
import authMiddleware from "../middleware/auth.js"
import express from "express"
const orderRoute = express.Router()

orderRoute.post("/order", authMiddleware, placeOrder)
orderRoute.post("/verify", verifyOrder)
orderRoute.post("/userorders", authMiddleware, userOrder)
orderRoute.get("/userlist", listOrder)
orderRoute.post("/status",updateStatus)


export default orderRoute
