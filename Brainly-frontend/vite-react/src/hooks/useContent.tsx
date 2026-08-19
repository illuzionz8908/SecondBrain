import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../Data/BackEndUrl";


// ─── Content Type Definition ──────────────────────────────────────────────────
export interface Content {
    _id: string;
    title: string;
    type: "youtube" | "twitter" | "document";
    link?: string;           // only for youtube/twitter
    filePath?: string;       // only for documents
    fileName?: string;       // only for documents  
    fileSize?: number;       // only for documents (in bytes)
    mimeType?: string;       // only for documents (e.g., "application/pdf")
}

export function useContent(){
    const [contents, setContents] = useState([]);

    function refresh(){
        axios.get(BACKEND_URL + "/app/v1/content" , {
            headers: {
                "Authorization" : localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })
    }

    useEffect(() => {
        refresh()

        let interval = setInterval(() => {
                    refresh()
                }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }

    },[])

    return {contents, refresh};
}