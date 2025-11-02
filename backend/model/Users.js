import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    picture:{
        type: String,
    },
    password: {
        type: String,
        required: function () {
            return !this.picture; // password required only if not using Google login
        }
    },
    mobile: {
        type: Number,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
