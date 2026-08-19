import express from "express"; 
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());


// ─── UPLOADS FOLDER SETUP ─────────────────────────────────────────────────────
const UPLOADS_DIR = "uploads";

// Create the uploads folder if it doesn't exist yet
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    console.log("Created uploads directory");
}

// Serve files in /uploads folder as static files
// e.g. http://localhost:3000/uploads/somefile.pdf
app.use("/uploads", express.static(UPLOADS_DIR));


// ─── MULTER CONFIGURATION ─────────────────────────────────────────────────────

// Controls WHERE and WHAT NAME files get saved with
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);              // save to /uploads folder
    },
    filename: (req, file, cb) => {
        // uuid ensures no two files ever have same name
        // path.extname gets the extension e.g ".pdf"
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);               // e.g "a1b2c3d4-xxxx.pdf"
    }
});

// Controls WHICH file types are accepted
const fileFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    const allowedMimeTypes = [
        "application/pdf",                                                          // .pdf
        "application/msword",                                                       // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",  // .docx
        "text/plain",                                                               // .txt
        "application/vnd.ms-powerpoint",                                            // .ppt
        "application/vnd.openxmlformats-officedocument.presentationml.presentation" // .pptx
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);     // accept file
    } else {
        cb(null, false);    // silently reject file
    }
};

// Final multer instance with all config
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024    // 10MB max
    }
});



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


// ─── UPLOAD DOCUMENT ──────────────────────────────────────────────────────────
app.post(
    "/app/v1/content/upload",
    userMiddleware,
    upload.single("document"),      // "document" must match FormData field name in frontend
    async (req, res) => {

        console.log("req.body →", req.body);
        console.log("req.file →", req.file);

        try {
            // req.file is undefined if no file was sent OR fileFilter rejected it
            if (!req.file) {
                res.status(400).json({
                    message: "No file uploaded. Check file type (PDF, DOC, DOCX, TXT, PPT, PPTX)"
                });
                return;
            }

            const { title } = req.body;

            // Title is required
            if (!title || !title.trim()) {
                // Delete the already-saved file since we won't store it
                fs.unlinkSync(req.file.path);
                res.status(400).json({ message: "Title is required" });
                return;
            }

            // Save document info to DB
            const newContent = await ContentModel.create({
                title: title.trim(),
                type: "document",
                filePath: req.file.path,            // "uploads/uuid.pdf"
                fileName: req.file.originalname,    // "my-notes.pdf"
                fileSize: req.file.size,            // 204800 (bytes)
                mimeType: req.file.mimetype,        // "application/pdf"
                //@ts-ignore
                userId: req.userId,
                tags: []
            });

            console.log("Document saved:", newContent._id);

            res.json({
                message: "Document uploaded successfully",
                content: newContent
            });

        } catch (error) {
            console.error("Upload error:", error);

            // Clean up file from disk if DB save failed
            if (req.file && fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }

            res.status(500).json({ message: "Upload failed. Please try again." });
        }
    }
);


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