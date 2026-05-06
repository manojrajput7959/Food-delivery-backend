import express from "express";
import { addFood, foodList, removeList } from "../controlllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// image Storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })



// Food routes
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/List", foodList)
foodRouter.post("/remove", removeList)

export default foodRouter
