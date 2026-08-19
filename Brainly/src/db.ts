import mongoose, {model, Schema} from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL);

const UserSchema = new Schema({
    email: {
        type: String, 
        unique: true
    },
    username: {
        type: String, 
        unique:true
    },
    password: String
})

export const UserModel = model("User",UserSchema);

const ContentSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    // link is now optional because documents won't have links
    link: {
        type: String,
        required: false
    },

    type: {
        type: String,
        enum: ["youtube", "twitter", "document"],
        required: true
    },

    // ─── Document specific fields (only populated when type === "document") ───
    filePath: {
        type: String,
        required: false     // "uploads/uuid.pdf"
    },
    fileName: {
        type: String,
        required: false     // original name e.g "my-notes.pdf"
    },
    fileSize: {
        type: Number,
        required: false     // size in bytes
    },
    mimeType: {
        type: String,
        required: false     // e.g "application/pdf"
    },

    tags: [{
        type: mongoose.Types.ObjectId, 
        ref:'Tag'
    }],

    userId: {
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
})

export const ContentModel = model("Content",ContentSchema);


const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true
    }
})

export const LinkModel = model("Links", LinkSchema);