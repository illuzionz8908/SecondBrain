import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({title,link,type} : CardProps){
    return <div className="p-4 bg-white rounded-sm shadow-md
    border-slate-200 max-w-72 border">

        <div className="flex justify-between">
            <div className="flex gap-2 items-center text-md">
                <div className="text-gray-500">
                    <ShareIcon size="md"/>
                </div>
                
                {title}

            </div>

            <div className="flex gap-3 items-center">
                <div className="text-gray-500">

                    <a href={link} target="_blank">
                        <ShareIcon size="md"/>
                    </a>

                </div>
                <div className="text-gray-500">
                    <ShareIcon size="md"/>
                </div>
            </div>
        </div>
        
        <div className="pt-4">
            {type === "youtube" &&<iframe className="w-full" 
            src={link.replace("watch", "embed").replace("?v=","/")} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
            gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
            </iframe> }

            {type === "twitter" && <blockquote className="twitter-tweet">
                <a href={link}></a> 
            </blockquote> }
        </div>
    </div>
}