import mongoose, {model, Schema} from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL);

const UserSchema = new Schema({
    email: {type: String, unique: true},
    username: {type: String , unique:true},
    password: String
})

export const UserModel = model("User",UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{type: mongoose.Types.ObjectId, ref:'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    type: String
})

export const ContentModel = model("Content",ContentSchema);


const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})

export const LinkModel = model("Links", LinkSchema);