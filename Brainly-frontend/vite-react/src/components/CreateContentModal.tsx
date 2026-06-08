import { useRef, useState } from "react";
import { Cross } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../Data/BackEndUrl";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open,onClose}){
    const titleRef = useRef<any>();
    const linkRef = useRef<any>();
    const [type,setType] = useState(ContentType.Youtube);

    //logic to add content to our db and then render it on the dashboard
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(BACKEND_URL + "/app/v1/content", {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })

        onClose();
    }
    

    return <div >
        {open && <div className="w-screen h-screen fixed bg-slate-500/60
         top-0 left-0 flex justify-center">

            <div className="flex flex-col justify-center">

                <span className="bg-white p-4 rounded-md">

                    <div className="flex justify-end">
                        <div onClick = {onClose} className="cursor-pointer">
                            <Cross/>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2 gap-3">
                        <Input type="text" reference={titleRef} placeholder={"Enter Title"}/>
                        <Input type="text" reference={linkRef} placeholder={"Enter link"}/>
                    </div>

                    <div>

                        <Button text="Youtube" 
                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                        size="md" onClick={() => {setType(ContentType.Youtube)}}/>

                        <Button text="Twitter" 
                        variant={type === ContentType.Twitter ? "primary" : "secondary"}
                        size="md" onClick={() => {setType(ContentType.Twitter)}}/>

                    </div>

                    <div className="flex justify-center mt-3">
                        <Button onClick={addContent} variant="primary" text="Submit" size="md"/>
                    </div>

                </span>

            </div>

            </div>}
    </div>
}