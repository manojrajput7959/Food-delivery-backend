import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: { type: String, required: true, },
   email: { type: String, required: true, trim: true, minlength: [13, 'Email must be at least 13 characters long'] },
   password: { type: String, required: true, trim: true },
   cartData: { type: Object, default: {} }
}, { minimize: false })

const userModels = mongoose.models.user || mongoose.model("user", userSchema)
export default userModels