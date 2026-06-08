import mongoose, {model, Schema} from "mongoose";

mongoose.connect("mongodb+srv://warmluke997_db_user:uxxh9oiwuLDEapcm@cluster0.rrgk38n.mongodb.net/Brainly");

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