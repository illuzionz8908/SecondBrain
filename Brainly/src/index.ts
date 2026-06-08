import express from "express"; 
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/app/v1/signup", async (req,res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
            email: email,
            username: username,
            password: password
        })

        res.json({
            message: "User signed up"
        })
    }
    catch(e){
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/app/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    //check if user with above credentials exists in db or not
    const user = await UserModel.findOne({
        username,
        password
    })

    //if user exists ,then sign jwt and send token to user
    if(user){
        const token = jwt.sign({
           id: user._id
        },JWT_SECRET);
        
        res.json({ 
            token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

app.post("/app/v1/content", userMiddleware, async (req,res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;

    await ContentModel.create({
        link,
        title,
        type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    return res.json({
        message: "Content added"
    })
})

app.get("/app/v1/content", userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId","username")

    res.json({
        content
    })
})

app.delete("/app/v1/content", userMiddleware, async (req,res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId: contentId,
        //@ts-ignore
        userId: req.userId
    })
})

app.post("/app/v1/brain/share", userMiddleware, async (req,res) => {
    const share = req.body.share;

    if(share){
        //first check if user already exists in Link model before creating a new link
        const existingUser = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        

        //if already an existing User,then return its already created hash
        if(existingUser){
            res.json({
                hash: existingUser.hash
            })
            return;
        }

        //else create one hash, store it and return to the user
        const hash = random(10);

        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
    }
    else{
        //if share -> false, then remove the sharable link
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });

        res.json({
            message: "Removed Link"
        });
    }
})

app.get("/app/v1/brain/:shareLink", async (req,res) => {
    //Now we have to return user with a hash with the contents 
    //by fteching contents from the DB
    const hash = req.params.shareLink;

    //now find if user exists with this hash
    const link = await LinkModel.findOne({
        //@ts-ignore
        hash
    });

    if(!link){
        res.status(411).json({
            message: "incorrect input"
        })
        return;
    }

    //else fetch contents for this user
    const content = await ContentModel.find({
        //@ts-ignore
        userId: link.userId
    })

    const user = await UserModel.findOne({
        //@ts-ignore
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "user not found"
        })
        return;
    }

    res.json({
        //@ts-ignore
        username: user.username,
        content: content
    })
})

app.listen(3000);