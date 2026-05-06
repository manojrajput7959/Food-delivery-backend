import foodModel from "../models/foodModels.js";
import fs from 'fs'

// add food items

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    console.log("REQ.BODY:", req.body);   // Check all text fields
    console.log("REQ.FILE:", req.file);

    //   instance of new object of schema
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "error" })
    }
}

// get  the list item 

const foodList = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    }

    catch (error) {
        console.log(error)
        res.json({ success: false, message: error })
    }
}


// remove the list item

const removeList = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`/uploads${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, foodList, removeList}


