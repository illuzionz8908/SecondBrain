// import { ShareIcon } from "../icons/ShareIcon";

// interface CardProps {
//     title: string;
//     link: string;
//     type: "twitter" | "youtube";
// }

// export function Card({title, link, type} : CardProps){
//     return <div className="p-4 bg-white rounded-sm shadow-md
//     border-slate-200 max-w-72 border">

//         <div className="flex justify-between">
//             <div className="flex gap-2 items-center text-md">

//                 <div className="text-gray-500">
//                     <ShareIcon size="md"/>
//                 </div>
                
//                 {title}

//             </div>

//             <div className="flex gap-3 items-center">

//                 <div className="text-gray-500">

//                     <a href={link} target="_blank">
//                         <ShareIcon size="md"/>
//                     </a>

//                 </div>

//                 <div className="text-gray-500">
//                     <ShareIcon size="md"/>
//                 </div>

//             </div>
//         </div>
        
//         <div className="pt-4">
//             {type === "youtube" && <iframe className="w-full" 
//             src={link.replace("watch", "embed").replace("?v=","/")} 
//             title="YouTube video player" frameBorder="0" 
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; 
//             gyroscope; picture-in-picture; web-share" 
//             referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
//             </iframe> }

//             {type === "twitter" && <blockquote className="twitter-tweet">
//                 <a href={link}></a> 
//             </blockquote> }
//         </div>
//     </div>
// }



import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function Card({ title, link, type }: CardProps) {
    const getEmbedLink = (url: string) => {
        if (url.includes("youtu.be/")) {
            return url.replace("youtu.be/", "youtube.com/embed/");
        }
        return url.replace("watch?v=", "embed/");
    };

    return (
        <div className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-100 
            shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] 
            transition-all duration-300 w-full max-w-[320px] min-h-[180px]">
            
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-3">
                
                {/* Left side: Icon + Title */}
                <div className="flex gap-2.5 items-center min-w-0">
                    <div className="shrink-0">
                        {type === "youtube" ? (
                            <div className="text-red-500 bg-red-50 p-1.5 rounded-lg">
                                <YoutubeIcon />
                            </div>
                        ) : (
                            <div className="text-sky-500 bg-sky-50 p-1.5 rounded-lg">
                                <TwitterIcon />
                            </div>
                        )}
                    </div>
                    <h3 className="text-sm font-medium text-slate-800 truncate pr-1" title={title}>
                        {title}
                    </h3>
                </div>

                {/* Right side: ONLY the link button, visible on hover */}
                <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-600 
                               hover:bg-slate-50 rounded-lg 
                               opacity-0 group-hover:opacity-100 
                               transition-all duration-200"
                    title="Open Source"
                >
                    <ExternalLinkIcon/>
                </a>

            </div>
            
            {/* Content Preview */}
            <div className="w-full">
                {type === "youtube" && (
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-100">
                        <iframe 
                            className="w-full h-full" 
                            src={getEmbedLink(link)} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin" 
                            allowFullScreen
                        />
                    </div>
                )}

                {type === "twitter" && (
                    <div className="overflow-y-auto max-h-[180px] w-full rounded-lg bg-slate-50 border border-slate-100/50 p-1 scrollbar-thin">
                        <blockquote className="twitter-tweet w-full m-0 scale-95 origin-top">
                            <a href={link}></a> 
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    );
}
