// import { useRef, useState } from "react";
// import { Cross } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";
// import axios from "axios";
// import { BACKEND_URL } from "../Data/BackEndUrl";

// enum ContentType {
//     Youtube = "youtube",
//     Twitter = "twitter"
// }

// export function CreateContentModal({open, onClose}){
//     const titleRef = useRef<any>();
//     const linkRef = useRef<any>();
//     const [type, setType] = useState(ContentType.Youtube);

//     //logic to add content to our db and then render it on the dashboard
//     async function addContent(){
//         const title = titleRef.current?.value;
//         const link = linkRef.current?.value;

//         await axios.post(BACKEND_URL + "/app/v1/content", {
//             link,
//             title,
//             type
//         }, {
//             headers: {
//                 "Authorization" : localStorage.getItem("token")
//             }
//         })

//         onClose();
//     }
    

//     return <div >
//         {open && <div className="w-screen h-screen fixed bg-slate-500/60
//          top-0 left-0 flex justify-center">

//             <div className="flex flex-col justify-center">

//                 <span className="bg-white p-4 rounded-md">

//                     <div className="flex justify-end">
//                         <div onClick = {onClose} className="cursor-pointer">
//                             <Cross/>
//                         </div>
//                     </div>

//                     <div className="flex flex-col mt-2 gap-3">
//                         <Input type="text" reference={titleRef} placeholder={"Enter Title"}/>
//                         <Input type="text" reference={linkRef} placeholder={"Enter link"}/>
//                     </div>

//                     <div>

//                         <Button text="Youtube" 
//                         variant={type === ContentType.Youtube ? "primary" : "secondary"}
//                         size="md" onClick={() => {setType(ContentType.Youtube)}}/>

//                         <Button text="Twitter" 
//                         variant={type === ContentType.Twitter ? "primary" : "secondary"}
//                         size="md" onClick={() => {setType(ContentType.Twitter)}}/>

//                     </div>

//                     <div className="flex justify-center mt-3">
//                         <Button onClick={addContent} variant="primary" text="Submit" size="md"/>
//                     </div>

//                 </span>

//             </div>

//             </div>}
//     </div>
// }




import { useRef, useState } from "react";
import { Cross } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import axios from "axios";
import { BACKEND_URL } from "../Data/BackEndUrl";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<any>();
    const linkRef = useRef<any>();
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);
            await axios.post(BACKEND_URL + "/app/v1/content", {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            onClose();
        } catch (error) {
            alert("Failed to add content");
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center 
                       bg-slate-900/40 backdrop-blur-sm 
                       animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4
                           border border-slate-100 
                           animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 pt-6 pb-2">
                    <h2 className="text-lg font-semibold text-slate-800">
                        Add New Content
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-slate-600 
                                   hover:bg-slate-100 rounded-lg 
                                   transition-all duration-200"
                    >
                        <Cross />
                    </button>
                </div>

                {/* Subtitle */}
                <p className="px-6 text-sm text-slate-500 mb-5">
                    Save a link to read or watch later
                </p>

                {/* Form Body */}
                <div className="px-6 space-y-4">
                    {/* Type Selection - Card style */}
                    <div>
                        <label className="text-xs font-medium text-slate-600 mb-2 block">
                            Content Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {/* YouTube Option */}
                            <button
                                onClick={() => setType(ContentType.Youtube)}
                                className={`flex items-center justify-center gap-2 
                                           py-2.5 px-4 rounded-lg border 
                                           transition-all duration-200
                                           ${type === ContentType.Youtube 
                                              ? "border-red-200 bg-red-50 text-red-600" 
                                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                <YoutubeIcon />
                                <span className="text-sm font-medium">YouTube</span>
                            </button>

                            {/* Twitter Option */}
                            <button
                                onClick={() => setType(ContentType.Twitter)}
                                className={`flex items-center justify-center gap-2 
                                           py-2.5 px-4 rounded-lg border 
                                           transition-all duration-200
                                           ${type === ContentType.Twitter 
                                              ? "border-sky-200 bg-sky-50 text-sky-600" 
                                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
                            >
                                <TwitterIcon />
                                <span className="text-sm font-medium">Twitter</span>
                            </button>
                        </div>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="text-xs font-medium text-slate-600 mb-2 block">
                            Title
                        </label>
                        <Input 
                            type="text" 
                            reference={titleRef} 
                            placeholder="Give it a memorable name..." 
                        />
                    </div>

                    {/* Link Input */}
                    <div>
                        <label className="text-xs font-medium text-slate-600 mb-2 block">
                            Link
                        </label>
                        <Input 
                            type="text" 
                            reference={linkRef} 
                            placeholder={`Paste your ${type} URL here...`} 
                        />
                    </div>
                </div>

                {/* Footer with buttons */}
                <div className="flex justify-end gap-2 px-6 py-4 mt-6 border-t border-slate-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 
                                   hover:bg-slate-100 rounded-lg 
                                   transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={addContent}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium text-white 
                                   bg-purple-600 hover:bg-purple-700 
                                   disabled:bg-purple-300 rounded-lg 
                                   transition-all duration-200"
                    >
                        {loading ? "Saving..." : "Save Content"}
                    </button>
                </div>
            </div>
        </div>
    );
}