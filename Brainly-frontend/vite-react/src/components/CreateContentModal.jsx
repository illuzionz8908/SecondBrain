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




// import { useRef, useState } from "react";
// import { Cross } from "../icons/CrossIcon";
// import { Button } from "./Button";
// import { Input } from "./Input";
// import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import axios from "axios";
// import { BACKEND_URL } from "../Data/BackEndUrl";

// enum ContentType {
//     Youtube = "youtube",
//     Twitter = "twitter"
// }

// interface CreateContentModalProps {
//     open: boolean;
//     onClose: () => void;
// }

// export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
//     const titleRef = useRef<any>();
//     const linkRef = useRef<any>();
//     const [type, setType] = useState(ContentType.Youtube);
//     const [loading, setLoading] = useState(false);

//     async function addContent() {
//         const title = titleRef.current?.value;
//         const link = linkRef.current?.value;

//         if (!title || !link) {
//             alert("Please fill in all fields");
//             return;
//         }

//         try {
//             setLoading(true);
//             await axios.post(BACKEND_URL + "/app/v1/content", {
//                 link,
//                 title,
//                 type
//             }, {
//                 headers: {
//                     "Authorization": localStorage.getItem("token")
//                 }
//             });
//             onClose();
//         } catch (error) {
//             alert("Failed to add content");
//         } finally {
//             setLoading(false);
//         }
//     }

//     if (!open) return null;

//     return (
//         <div 
//             className="fixed inset-0 z-50 flex items-center justify-center 
//                        bg-slate-900/40 backdrop-blur-sm 
//                        animate-in fade-in duration-200"
//             onClick={onClose}
//         >
//             <div 
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4
//                            border border-slate-100 
//                            animate-in zoom-in-95 duration-200"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 {/* Header */}
//                 <div className="flex justify-between items-center px-6 pt-6 pb-2">
//                     <h2 className="text-lg font-semibold text-slate-800">
//                         Add New Content
//                     </h2>
//                     <button 
//                         onClick={onClose}
//                         className="p-1.5 text-slate-400 hover:text-slate-600 
//                                    hover:bg-slate-100 rounded-lg 
//                                    transition-all duration-200"
//                     >
//                         <Cross />
//                     </button>
//                 </div>

//                 {/* Subtitle */}
//                 <p className="px-6 text-sm text-slate-500 mb-5">
//                     Save a link to read or watch later
//                 </p>

//                 {/* Form Body */}
//                 <div className="px-6 space-y-4">
//                     {/* Type Selection - Card style */}
//                     <div>
//                         <label className="text-xs font-medium text-slate-600 mb-2 block">
//                             Content Type
//                         </label>
//                         <div className="grid grid-cols-2 gap-2">
//                             {/* YouTube Option */}
//                             <button
//                                 onClick={() => setType(ContentType.Youtube)}
//                                 className={`flex items-center justify-center gap-2 
//                                            py-2.5 px-4 rounded-lg border 
//                                            transition-all duration-200
//                                            ${type === ContentType.Youtube 
//                                               ? "border-red-200 bg-red-50 text-red-600" 
//                                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
//                             >
//                                 <YoutubeIcon />
//                                 <span className="text-sm font-medium">YouTube</span>
//                             </button>

//                             {/* Twitter Option */}
//                             <button
//                                 onClick={() => setType(ContentType.Twitter)}
//                                 className={`flex items-center justify-center gap-2 
//                                            py-2.5 px-4 rounded-lg border 
//                                            transition-all duration-200
//                                            ${type === ContentType.Twitter 
//                                               ? "border-sky-200 bg-sky-50 text-sky-600" 
//                                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}
//                             >
//                                 <TwitterIcon />
//                                 <span className="text-sm font-medium">Twitter</span>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Title Input */}
//                     <div>
//                         <label className="text-xs font-medium text-slate-600 mb-2 block">
//                             Title
//                         </label>
//                         <Input 
//                             type="text" 
//                             reference={titleRef} 
//                             placeholder="Give it a memorable name..." 
//                         />
//                     </div>

//                     {/* Link Input */}
//                     <div>
//                         <label className="text-xs font-medium text-slate-600 mb-2 block">
//                             Link
//                         </label>
//                         <Input 
//                             type="text" 
//                             reference={linkRef} 
//                             placeholder={`Paste your ${type} URL here...`} 
//                         />
//                     </div>
//                 </div>

//                 {/* Footer with buttons */}
//                 <div className="flex justify-end gap-2 px-6 py-4 mt-6 border-t border-slate-100">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 text-sm font-medium text-slate-600 
//                                    hover:bg-slate-100 rounded-lg 
//                                    transition-all duration-200"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={addContent}
//                         disabled={loading}
//                         className="px-4 py-2 text-sm font-medium text-white 
//                                    bg-purple-600 hover:bg-purple-700 
//                                    disabled:bg-purple-300 rounded-lg 
//                                    transition-all duration-200"
//                     >
//                         {loading ? "Saving..." : "Save Content"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }







// import { useRef, useState } from "react";
// import { Cross } from "../icons/CrossIcon";
// import { Input } from "./Input";
// import { YoutubeIcon } from "../icons/YoutubeIcon";
// import { TwitterIcon } from "../icons/TwitterIcon";
// import { DocumentIcon } from "../icons/DocumentIcon";
// import axios from "axios";
// import { BACKEND_URL } from "../Data/BackEndUrl";
// import { LinkedInIcon } from "../icons/LinkedinIcon";

// const ContentType = {
//   Youtube: "youtube",
//   Twitter: "twitter",
//   Document: "document",
//   Linkedin: "linkedin"
// };

// export function CreateContentModal({ open, onClose }) {

//   const titleRef = useRef();
//   const linkRef = useRef();
//   const fileInputRef = useRef(null);

//   const [type, setType] = useState(ContentType.Youtube);
//   const [loading, setLoading] = useState(false);


//   // ─── Document specific state ──────────────────────────────────────────────
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [dragOver, setDragOver] = useState(false);


//   // ─── File Handling ────────────────────────────────────────────────────────
//   function handleFileSelect(file) {
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       "text/plain",
//       "application/vnd.ms-powerpoint",
//       "application/vnd.openxmlformats-officedocument.presentationml.presentation",
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       alert("Invalid file type. Allowed: PDF, DOC, DOCX, TXT, PPT, PPTX");
//       return;
//     }

//     if (file.size > maxSize) {
//       alert("File too large. Maximum size is 10MB");
//       return;
//     }

//     setSelectedFile(file);

//     // Auto-fill title with filename if title is empty
//     if (titleRef.current && !titleRef.current.value) {
//       titleRef.current.value = file.name.replace(/\.[^/.]+$/, "");
//     }
//   }

//   function handleDrop(e) {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) handleFileSelect(file);
//   }

//   function formatFileSize(bytes) {
//     if (!bytes) return "";
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   }

//   // ─── Submit Handler ───────────────────────────────────────────────────────
//   async function addContent() {
//     const title = titleRef.current?.value;

//     if (!title) {
//       alert("Please enter a title");
//       return;
//     }

//     try {
//       setLoading(true);

//       if (type === ContentType.Document) {
//         // ─── Document Upload ──────────────────────────────────────────
//         if (!selectedFile) {
//           alert("Please select a file to upload");
//           setLoading(false);
//           return;
//         }

//         const formData = new FormData();
//         formData.append("document", selectedFile); // must match multer field name
//         formData.append("title", title);

//         await axios.post(BACKEND_URL + "/app/v1/content/upload", formData, {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//           onUploadProgress: (progressEvent) => {
//             if (progressEvent.total) {
//               const percent = Math.round(
//                 (progressEvent.loaded * 100) / progressEvent.total
//               );
//               setUploadProgress(percent);
//             }
//           },
//         });
//       } else {
//         // ─── YouTube / Twitter Link ───────────────────────────────────
//         const link = linkRef.current?.value;

//         if (!link) {
//           alert("Please enter a link");
//           setLoading(false);
//           return;
//         }

//         await axios.post(
//           BACKEND_URL + "/app/v1/content",
//           {
//             link,
//             title,
//             type,
//           },
//           {
//             headers: {
//               Authorization: localStorage.getItem("token"),
//             },
//           }
//         );
//       }

//       resetAndClose();

//     } catch (error) {
//       alert("Failed to add content");
//     } finally {
//       setLoading(false);
//     }
//   }

//   function resetAndClose() {
//     setSelectedFile(null);
//     setUploadProgress(0);
//     setType(ContentType.Youtube);
//     if (titleRef.current) titleRef.current.value = "";
//     if (linkRef.current) linkRef.current.value = "";
//     onClose();
//   }

//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center 
//                  bg-slate-900/40 backdrop-blur-sm 
//                  animate-in fade-in duration-200"
//       onClick={resetAndClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4
//                    border border-slate-100 
//                    animate-in zoom-in-95 duration-200"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center px-6 pt-6 pb-2">
//           <h2 className="text-lg font-semibold text-slate-800">
//             Add New Content
//           </h2>
//           <button
//             onClick={resetAndClose}
//             className="p-1.5 text-slate-400 hover:text-slate-600 
//                        hover:bg-slate-100 rounded-lg 
//                        transition-all duration-200"
//           >
//             <Cross />
//           </button>
//         </div>

//         {/* Subtitle */}
//         <p className="px-6 text-sm text-slate-500 mb-5">
//           {type === ContentType.Document
//             ? "Upload a document to save for later"
//             : "Save a link to read or watch later"}
//         </p>

//         {/* Form Body */}
//         <div className="px-6 space-y-4">
//           {/* Type Selection */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 mb-2 block">
//               Content Type
//             </label>
//             <div className="grid grid-cols-3 gap-2">
//               {/* YouTube */}
//               <button
//                 onClick={() => setType(ContentType.Youtube)}
//                 className={`flex items-center justify-center gap-2 
//                            py-2.5 px-3 rounded-lg border 
//                            transition-all duration-200
//                            ${
//                              type === ContentType.Youtube
//                                ? "border-red-200 bg-red-50 text-red-600"
//                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//                            }`}
//               >
//                 <YoutubeIcon />
//                 <span className="text-sm font-medium">YouTube</span>
//               </button>

//               {/* Twitter */}
//               <button
//                 onClick={() => setType(ContentType.Twitter)}
//                 className={`flex items-center justify-center gap-2 
//                            py-2.5 px-3 rounded-lg border 
//                            transition-all duration-200
//                            ${
//                              type === ContentType.Twitter
//                                ? "border-sky-200 bg-sky-50 text-sky-600"
//                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//                            }`}
//               >
//                 <TwitterIcon />
//                 <span className="text-sm font-medium">Twitter</span>
//               </button>


//               {/* LinkedIn */}
//               <button
//                 onClick={() => setType(ContentType.Linkedin)}
//                 className={`flex items-center justify-center gap-1.5 
//                            py-2 px-2 rounded-lg border 
//                            transition-all duration-200
//                            ${
//                              type === ContentType.Linkedin
//                                ? "border-blue-200 bg-blue-50 text-blue-600"
//                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//                            }`}
//               >
//                 <LinkedInIcon />
//                 <span className="text-xs font-medium">LinkedIn</span>
//               </button>


//               {/* Document */}
//               <button
//                 onClick={() => setType(ContentType.Document)}
//                 className={`flex items-center justify-center gap-2 
//                            py-2.5 px-3 rounded-lg border 
//                            transition-all duration-200
//                            ${
//                              type === ContentType.Document
//                                ? "border-purple-200 bg-purple-50 text-purple-600"
//                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
//                            }`}
//               >
//                 <DocumentIcon />
//                 <span className="text-sm font-medium">Document</span>
//               </button>
//             </div>
//           </div>

//           {/* Title Input */}
//           <div>
//             <label className="text-xs font-medium text-slate-600 mb-2 block">
//               Title
//             </label>
//             <Input
//               type="text"
//               reference={titleRef}
//               placeholder="Give it a memorable name..."
//             />
//           </div>

//           {/* CONDITIONAL: Link Input OR File Upload */}
//           {type !== ContentType.Document ? (
//             // ─── Link Input (YouTube / Twitter) ─────────────────────
//             <div>
//               <label className="text-xs font-medium text-slate-600 mb-2 block">
//                 Link
//               </label>
//               <Input
//                 type="text"
//                 reference={linkRef}
//                 placeholder={`Paste your ${type} URL here...`}
//               />
//             </div>
//           ) : (
//             // ─── File Upload (Document) ─────────────────────────────
//             <div>
//               <label className="text-xs font-medium text-slate-600 mb-2 block">
//                 Document
//               </label>

//               {/* Drop Zone */}
//               <div
//                 onDrop={handleDrop}
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   setDragOver(true);
//                 }}
//                 onDragLeave={() => setDragOver(false)}
//                 onClick={() => fileInputRef.current?.click()}
//                 className={`
//                   border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
//                   transition-all duration-200
//                   ${
//                     dragOver
//                       ? "border-purple-400 bg-purple-50"
//                       : selectedFile
//                       ? "border-green-300 bg-green-50"
//                       : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
//                   }
//                 `}
//               >
//                 {selectedFile ? (
//                   /* File Selected */
//                   <div className="flex items-center gap-3">
//                     <span className="text-3xl">
//                       {selectedFile.type === "application/pdf" ? "📕" : "📄"}
//                     </span>
//                     <div className="text-left flex-1 min-w-0">
//                       <p className="text-sm font-medium text-slate-700 truncate">
//                         {selectedFile.name}
//                       </p>
//                       <p className="text-xs text-slate-400">
//                         {formatFileSize(selectedFile.size)}
//                       </p>
//                     </div>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setSelectedFile(null);
//                         setUploadProgress(0);
//                       }}
//                       className="p-1 text-slate-400 hover:text-red-500 
//                                  hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <Cross />
//                     </button>
//                   </div>
//                 ) : (
//                   /* Empty State */
//                   <div>
//                     <p className="text-3xl mb-2">📁</p>
//                     <p className="text-sm text-slate-600 font-medium">
//                       Drop file here or click to browse
//                     </p>
//                     <p className="text-xs text-slate-400 mt-1">
//                       PDF, DOC, DOCX, TXT, PPT, PPTX · Max 10MB
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Hidden File Input */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 className="hidden"
//                 accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
//                 onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (file) handleFileSelect(file);
//                 }}
//               />

//               {/* Upload Progress */}
//               {loading && uploadProgress > 0 && (
//                 <div className="mt-3">
//                   <div className="flex justify-between text-xs text-slate-500 mb-1">
//                     <span>Uploading...</span>
//                     <span>{uploadProgress}%</span>
//                   </div>
//                   <div className="w-full bg-slate-100 rounded-full h-1.5">
//                     <div
//                       className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
//                       style={{ width: `${uploadProgress}%` }}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-2 px-6 py-4 mt-6 border-t border-slate-100">
//           <button
//             onClick={resetAndClose}
//             className="px-4 py-2 text-sm font-medium text-slate-600 
//                        hover:bg-slate-100 rounded-lg 
//                        transition-all duration-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={addContent}
//             disabled={loading}
//             className="px-4 py-2 text-sm font-medium text-white 
//                        bg-purple-600 hover:bg-purple-700 
//                        disabled:bg-purple-300 rounded-lg 
//                        transition-all duration-200"
//           >
//             {loading
//               ? type === ContentType.Document
//                 ? "Uploading..."
//                 : "Saving..."
//               : "Save Content"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useRef, useState } from "react";
import { Cross } from "../icons/CrossIcon";
import { Input } from "./Input";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkedInIcon } from "../icons/LinkedinIcon";
import axios from "axios";
import { BACKEND_URL } from "../Data/BackEndUrl";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Linkedin: "linkedin",
  Document: "document",
};

export function CreateContentModal({ open, onClose }) {
  const titleRef = useRef();
  const linkRef = useRef();
  const fileInputRef = useRef(null);

  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  // ─── Document specific state ──────────────────────────────────────────────
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  // ─── File Handling ────────────────────────────────────────────────────────
  function handleFileSelect(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Allowed: PDF, DOC, DOCX, TXT, PPT, PPTX");
      return;
    }

    if (file.size > maxSize) {
      alert("File too large. Maximum size is 10MB");
      return;
    }

    setSelectedFile(file);

    // Auto-fill title with filename if title is empty
    if (titleRef.current && !titleRef.current.value) {
      titleRef.current.value = file.name.replace(/\.[^/.]+$/, "");
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function formatFileSize(bytes) {
    if (!bytes) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  // ─── Submit Handler ───────────────────────────────────────────────────────
  async function addContent() {
    const title = titleRef.current?.value;

    if (!title) {
      alert("Please enter a title");
      return;
    }

    try {
      setLoading(true);

      if (type === ContentType.Document) {
        // ─── Document Upload ──────────────────────────────────────────
        if (!selectedFile) {
          alert("Please select a file to upload");
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append("document", selectedFile);
        formData.append("title", title);

        await axios.post(BACKEND_URL + "/app/v1/content/upload", formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            }
          },
        });
      } else {
        // ─── YouTube / Twitter / LinkedIn Link ─────────────────────────
        const link = linkRef.current?.value;

        if (!link) {
          alert("Please enter a link");
          setLoading(false);
          return;
        }

        await axios.post(
          BACKEND_URL + "/app/v1/content",
          {
            link,
            title,
            type,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }

      resetAndClose();
    } catch (error) {
      alert("Failed to add content");
    } finally {
      setLoading(false);
    }
  }

  function resetAndClose() {
    setSelectedFile(null);
    setUploadProgress(0);
    setType(ContentType.Youtube);
    if (titleRef.current) titleRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-slate-900/40 backdrop-blur-sm 
                 animate-in fade-in duration-200"
      onClick={resetAndClose}
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
            onClick={resetAndClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 
                       hover:bg-slate-100 rounded-lg 
                       transition-all duration-200"
          >
            <Cross />
          </button>
        </div>

        {/* Subtitle */}
        <p className="px-6 text-sm text-slate-500 mb-5">
          {type === ContentType.Document
            ? "Upload a document to save for later"
            : "Save a link to read or watch later"}
        </p>

        {/* Form Body */}
        <div className="px-6 space-y-4">
          {/* Type Selection - Clean 2x2 grid for standard screens, 4 columns if wide */}
          <div>
            <label className="text-xs font-medium text-slate-600 mb-2 block">
              Content Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* YouTube */}
              <button
                onClick={() => setType(ContentType.Youtube)}
                className={`flex items-center justify-center gap-1.5 
                           py-2 px-2.5 rounded-lg border 
                           transition-all duration-200
                           ${
                             type === ContentType.Youtube
                               ? "border-red-200 bg-red-50 text-red-600 font-semibold"
                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                           }`}
              >
                <YoutubeIcon />
                <span className="text-xs">YouTube</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => setType(ContentType.Twitter)}
                className={`flex items-center justify-center gap-1.5 
                           py-2 px-2.5 rounded-lg border 
                           transition-all duration-200
                           ${
                             type === ContentType.Twitter
                               ? "border-sky-200 bg-sky-50 text-sky-600 font-semibold"
                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                           }`}
              >
                <TwitterIcon />
                <span className="text-xs">Twitter</span>
              </button>

              {/* LinkedIn */}
              <button
                onClick={() => setType(ContentType.Linkedin)}
                className={`flex items-center justify-center gap-1.5 
                           py-2 px-2.5 rounded-lg border 
                           transition-all duration-200
                           ${
                             type === ContentType.Linkedin
                               ? "border-blue-200 bg-blue-50 text-blue-600 font-semibold"
                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                           }`}
              >
                <LinkedInIcon />
                <span className="text-xs">LinkedIn</span>
              </button>

              {/* Document */}
              <button
                onClick={() => setType(ContentType.Document)}
                className={`flex items-center justify-center gap-1.5 
                           py-2 px-2.5 rounded-lg border 
                           transition-all duration-200
                           ${
                             type === ContentType.Document
                               ? "border-purple-200 bg-purple-50 text-purple-600 font-semibold"
                               : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                           }`}
              >
                <DocumentIcon />
                <span className="text-xs">Document</span>
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

          {/* CONDITIONAL: Link Input OR File Upload */}
          {type !== ContentType.Document ? (
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
          ) : (
            <div>
              <label className="text-xs font-medium text-slate-600 mb-2 block">
                Document
              </label>

              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
                  transition-all duration-200
                  ${
                    dragOver
                      ? "border-purple-400 bg-purple-50"
                      : selectedFile
                      ? "border-green-300 bg-green-50"
                      : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                  }
                `}
              >
                {selectedFile ? (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {selectedFile.type === "application/pdf" ? "📕" : "📄"}
                    </span>
                    <div className="text-left flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setUploadProgress(0);
                      }}
                      className="p-1 text-slate-400 hover:text-red-500 
                                 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Cross />
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl mb-2">📁</p>
                    <p className="text-sm text-slate-600 font-medium">
                      Drop file here or click to browse
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PDF, DOC, DOCX, TXT, PPT, PPTX · Max 10MB
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
              />

              {loading && uploadProgress > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-6 py-4 mt-6 border-t border-slate-100">
          <button
            onClick={resetAndClose}
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
            {loading
              ? type === ContentType.Document
                ? "Uploading..."
                : "Saving..."
              : "Save Content"}
          </button>
        </div>
      </div>
    </div>
  );
}