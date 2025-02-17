import mongoose from "mongoose";

let userSchema: mongoose.Schema<any> = new mongoose.Schema({
    email: { type: String, required: true, minlength: 5 },
    password: { type: String, required: true, minlength: 5 },
    username: { type: String, required: true, minlength: 5 },
    telephone: { type: String, required: false, default: null }
})

let User: mongoose.Model<any> = mongoose.model<any>('User', userSchema);
export default User;




