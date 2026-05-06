import userModels from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";


// ---------------------- SIGN UP ---------------------- //

const userSign = async (req, res) => {
 
    const { name, email, password } = req.body;  // to get the user data form the body  
   
  try {

    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModels.create({
      name, 
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    return res.json({
      success: true,
      token,
      message: "User created successfully"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ---------------------- LOGIN ---------------------- //

const userLogin = async (req, res) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
        error: error.array()
      });
    }

    const { email, password } = req.body;

    const user = await userModels.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Email or password is incorrect"
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    return res.json({
      success: true,
      token,
      message: "Login successful"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export { userSign, userLogin };
