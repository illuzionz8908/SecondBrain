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



// import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";

// interface CardProps {
//     title: string;
//     link: string;
//     type: "twitter" | "youtube";
// }

// export function Card({ title, link, type }: CardProps) {
//     const getEmbedLink = (url: string) => {
//         if (url.includes("youtu.be/")) {
//             return url.replace("youtu.be/", "youtube.com/embed/");
//         }
//         return url.replace("watch?v=", "embed/");
//     };

//     return (
//         <div className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-100 
//             shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] 
//             transition-all duration-300 w-full max-w-[320px] min-h-[180px]">
            
//             {/* Header */}
//             <div className="flex justify-between items-start gap-4 mb-3">
                
//                 {/* Left side: Icon + Title */}
//                 <div className="flex gap-2.5 items-center min-w-0">
//                     <div className="shrink-0">
//                         {type === "youtube" ? (
//                             <div className="text-red-500 bg-red-50 p-1.5 rounded-lg">
//                                 <YoutubeIcon />
//                             </div>
//                         ) : (
//                             <div className="text-sky-500 bg-sky-50 p-1.5 rounded-lg">
//                                 <TwitterIcon />
//                             </div>
//                         )}
//                     </div>
//                     <h3 className="text-sm font-medium text-slate-800 truncate pr-1" title={title}>
//                         {title}
//                     </h3>
//                 </div>

//                 {/* Right side: ONLY the link button, visible on hover */}
//                 <a 
//                     href={link} 
//                     target="_blank" 
//                     rel="noopener noreferrer"
//                     className="p-1.5 text-slate-400 hover:text-slate-600 
//                                hover:bg-slate-50 rounded-lg 
//                                opacity-0 group-hover:opacity-100 
//                                transition-all duration-200"
//                     title="Open Source"
//                 >
//                     <ExternalLinkIcon/>
//                 </a>

//             </div>
            
//             {/* Content Preview */}
//             <div className="w-full">
//                 {type === "youtube" && (
//                     <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-100">
//                         <iframe 
//                             className="w-full h-full" 
//                             src={getEmbedLink(link)} 
//                             title="YouTube video player" 
//                             frameBorder="0" 
//                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                             referrerPolicy="strict-origin-when-cross-origin" 
//                             allowFullScreen
//                         />
//                     </div>
//                 )}

//                 {type === "twitter" && (
//                     <div className="overflow-y-auto max-h-[180px] w-full rounded-lg bg-slate-50 border border-slate-100/50 p-1 scrollbar-thin">
//                         <blockquote className="twitter-tweet w-full m-0 scale-95 origin-top">
//                             <a href={link}></a> 
//                         </blockquote>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }




import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkedInIcon } from "../icons/LinkedinIcon";
import { ExternalLinkIcon } from "../icons/ExternalLinkIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { BACKEND_URL } from "../Data/BackEndUrl";
import axios from "axios";

// Helper to get document icon based on file type
function getDocIcon(mimeType) {
  if (!mimeType) return "📄";
  if (mimeType === "application/pdf") return "📕";
  if (mimeType.includes("word")) return "📘";
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint"))
    return "📊";
  if (mimeType === "text/plain") return "📝";
  return "📄";
}

// Helper to format file size
function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Card({
  contentId,
  title,
  link,
  type,
  filePath,
  fileName,
  fileSize,
  mimeType,
  onDelete,
}) {
  // ─── Delete Handler ─────────────────────────────────────────────────────────
  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await axios.delete(`${BACKEND_URL}/app/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        data: {
          contentId: contentId,
        },
      });

      if (onDelete) onDelete();
    } catch (error) {
      alert("Failed to delete content");
    }
  }

  const getEmbedLink = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url.replace("watch?v=", "embed/");
  };

  const getLinkedInEmbedLink = (url) => {
    if (!url) return "";
    if (url.includes("/embed/")) return url;

    const activityMatch = url.match(/activity-([0-9]+)/);
    if (activityMatch && activityMatch[1]) {
      return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;
    }

    const urnMatch = url.match(/urn:li:(?:activity|share):([0-9]+)/);
    if (urnMatch && urnMatch[1]) {
      return `https://www.linkedin.com/embed/feed/update/urn:li:share:${urnMatch[1]}`;
    }

    return url;
  };

  // ─── Document Card ──────────────────────────────────────────────────────────
  if (type === "document") {
    const fileUrl = `${BACKEND_URL}/${filePath?.replace(/\\/g, "/")}`;

    return (
      <div
        className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-100 
                shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] 
                transition-all duration-300 w-full max-w-[320px] min-h-[180px]"
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="flex gap-2.5 items-center min-w-0">
            <div className="shrink-0">
              <div className="text-purple-500 bg-purple-50 p-1.5 rounded-lg">
                <DocumentIcon />
              </div>
            </div>
            <div className="min-w-0">
              <h3
                className="text-sm font-medium text-slate-800 truncate"
                title={title}
              >
                {title}
              </h3>
              {fileName && (
                <p
                  className="text-xs text-slate-400 truncate"
                  title={fileName}
                >
                  {fileName}
                </p>
              )}
            </div>
          </div>

          {/* Right Action Icons: File Size + Delete */}
          <div className="flex items-center gap-1.5 shrink-0">
            {fileSize && (
              <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md font-medium">
                {formatFileSize(fileSize)}
              </span>
            )}
            <button
              onClick={handleDelete}
              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Content"
            >
              <TrashIcon />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex-1 flex items-center justify-center py-6 bg-slate-50 rounded-lg border border-slate-100 mb-4">
          <div className="text-center">
            <span className="text-4xl">{getDocIcon(mimeType)}</span>
            <p className="text-xs text-slate-400 mt-2 font-medium">
              {mimeType?.split("/").pop()?.toUpperCase() || "FILE"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3
                       bg-purple-50 text-purple-600 rounded-lg text-xs font-medium
                       hover:bg-purple-100 transition-colors duration-200"
          >
            <ExternalLinkIcon />
            View
          </a>
          <a
            href={fileUrl}
            download={fileName}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3
                       bg-slate-50 text-slate-600 rounded-lg text-xs font-medium
                       hover:bg-slate-100 transition-colors duration-200"
          >
            ⬇️ Download
          </a>
        </div>
      </div>
    );
  }

  // ─── YouTube / Twitter / LinkedIn Cards ───────────────────────────────────────
  return (
    <div
      className="group flex flex-col justify-between p-5 bg-white rounded-xl border border-slate-100 
            shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] 
            transition-all duration-300 w-full max-w-[320px] min-h-[180px]"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-2 mb-3">
        <div className="flex gap-2.5 items-center min-w-0">
          <div className="shrink-0">
            {type === "youtube" ? (
              <div className="text-red-500 bg-red-50 p-1.5 rounded-lg">
                <YoutubeIcon />
              </div>
            ) : type === "twitter" ? (
              <div className="text-sky-500 bg-sky-50 p-1.5 rounded-lg">
                <TwitterIcon />
              </div>
            ) : (
              <div className="text-blue-600 bg-blue-50 p-1.5 rounded-lg">
                <LinkedInIcon />
              </div>
            )}
          </div>
          <h3
            className="text-sm font-medium text-slate-800 truncate pr-1"
            title={title}
          >
            {title}
          </h3>
        </div>

        {/* Action icons: External Link + Delete Button */}
        <div className="flex items-center gap-1 shrink-0">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all duration-200"
            title="Open Source"
          >
            <ExternalLinkIcon />
          </a>

          <button
            onClick={handleDelete}
            className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete Content"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="w-full">
        {type === "youtube" && link && (
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

        {type === "twitter" && link && (
          <div className="overflow-y-auto max-h-[180px] w-full rounded-lg bg-slate-50 border border-slate-100/50 p-1 scrollbar-thin">
            <blockquote className="twitter-tweet w-full m-0 scale-95 origin-top">
              <a href={link}></a>
            </blockquote>
          </div>
        )}

        {type === "linkedin" && link && (
          <div className="h-[250px] w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50">
            <iframe
              className="w-full h-full"
              src={getLinkedInEmbedLink(link)}
              title="LinkedIn post"
              frameBorder="0"
            />
          </div>
        )}
      </div>
    </div>
  );
}