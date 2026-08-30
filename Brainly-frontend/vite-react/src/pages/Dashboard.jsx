
// import { useEffect, useState } from 'react'
// import '../App.css'
// import { Button } from '../components/Button'
// import { ShareIcon } from '../icons/ShareIcon'
// import { PlusIcon } from '../icons/PlusIcon'
// import { Card } from '../components/Card'
// import { CreateContentModal } from '../components/CreateContentModal'
// import { Sidebar } from '../components/SideBar'
// import { useContent } from '../hooks/useContent'

// export function Dashboard() {
//   const [modalOpen, setModalOpen] = useState(false);
//   const {contents, refresh} = useContent();

//   //to track active tab
//   const [activeTab, setActivTab] = useState("all");

//   useEffect(() =>{
//     refresh()
//   },[modalOpen])


//   //filter contents based on Active Tab
//   const filteredContents = activeTab == "all" ? contents : contents.filter((content) => content.type == activeTab)

//   return (<div>

//     <Sidebar
//         activeTab={activeTab}
//         onTabChange={setActivTab}/>

//     <div className="p-4 ml-72 bg-gray-200 min-h-screen">

//         <CreateContentModal 
//             open={modalOpen} 
//             onClose ={ () => { setModalOpen(false)}}
//         />

//         <div className='flex justify-end gap-4'>

//           <Button 
//               onClick = {() => setModalOpen(true)} 
//               startIcon = {<PlusIcon size="md"/>}  
//               variant="primary" 
//               text="Add Content" 
//               size="sm">
//           </Button>

//           <Button 
//               startIcon = {<ShareIcon size="md"/>} 
//               variant="secondary" 
//               text="Share" 
//               size="md">
//           </Button>

//         </div>


//          {/* Show which tab is selected */}
//         <h2 className="text-xl font-bold mt-4 capitalize">
//             {activeTab === "all" ? "All Saved Contents" : `${activeTab} Saved Contents`}
//         </h2>

//         <div className='flex pt-4 gap-4 flex-wrap'>

//             {filteredContents.length > 0 ? (
//               filteredContents.map(({_id, title, type, link, filePath, fileName, fileSize, mimeType}) => (
//                 <Card
//                   key={_id}
//                   contentId={_id}
//                   type={type}
//                   title={title}
//                   link={link}
//                   filePath={filePath}
//                   fileName={fileName}
//                   fileSize={fileSize}
//                   mimeType={mimeType}
//                   onDelete={refresh}
//                 />
//               ))
//             ) : (
//               <p className='text-gray-500'>
//                 No {activeTab} Content saved yet
//               </p>
//             )}

//         </div>

//     </div>
//   </div>)
// }



import { useEffect, useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { ShareIcon } from '../icons/ShareIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/SideBar';
import { useContent } from '../hooks/useContent';
import { SearchIcon } from '../icons/SearchIcon';

export function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActivTab] = useState("all");

    // ─── Search State ─────────────────────────────────────────────────────────
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const { contents, refresh, loading } = useContent(searchQuery);

    useEffect(() => {
        refresh();
    }, [modalOpen]);

    // ─── Debounced Search ─────────────────────────────────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // ─── Filter by Active Tab ─────────────────────────────────────────────────
    const filteredContents = activeTab === "all"
        ? contents
        : contents.filter((content) => content.type === activeTab);

    return (
        <div>
            <Sidebar
                activeTab={activeTab}
                onTabChange={setActivTab}
            />

            <div className="p-4 ml-72 bg-gray-200 min-h-screen">

                <CreateContentModal
                    open={modalOpen}
                    onClose={() => { setModalOpen(false) }}
                />

                {/* Top Bar: Search + Buttons */}
                <div className="flex justify-between items-center gap-4">

                    {/* Search Input Box */}
                    <div className="flex-1 max-w-md relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <SearchIcon size='sm'/>
                        </span>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search saved content..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200
                                       rounded-xl text-sm text-gray-700
                                       placeholder-gray-400
                                       focus:outline-none focus:ring-2 focus:ring-purple-400
                                       focus:border-transparent
                                       shadow-sm"
                        />
                        {/* Clear Button */}
                        {searchInput && (
                            <button
                                onClick={() => {
                                    setSearchInput("");
                                    setSearchQuery("");
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2
                                           text-gray-400 hover:text-gray-600 text-sm"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <Button
                            onClick={() => setModalOpen(true)}
                            startIcon={<PlusIcon size="md" />}
                            variant="primary"
                            text="Add Content"
                            size="sm"
                        />
                        <Button
                            startIcon={<ShareIcon size="md" />}
                            variant="secondary"
                            text="Share"
                            size="md"
                        />
                    </div>
                </div>

                {/* Header Title + Result Count */}
                <div className="flex justify-between items-center mt-4">
                    <h2 className="text-xl font-bold capitalize">
                        {activeTab === "all"
                            ? "All Saved Contents"
                            : `${activeTab} Saved Contents`
                        }
                    </h2>

                    {searchQuery && (
                        <span className="text-sm text-gray-500">
                            {filteredContents.length} result{filteredContents.length !== 1 ? "s" : ""} found
                        </span>
                    )}
                </div>

                {/* Content Cards Grid */}
                <div className="flex pt-4 gap-4 flex-wrap">

                    {loading ? (
                        // Loading Skeletons
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-full max-w-[320px] h-[200px] bg-white rounded-xl
                                           animate-pulse border border-gray-100"
                            >
                                <div className="p-5">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                                    <div className="h-24 bg-gray-100 rounded mb-3" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))
                    ) : filteredContents.length > 0 ? (
                        filteredContents.map(({ _id, title, type, link, filePath, fileName, fileSize, mimeType, summary }) => (
                            <Card
                                key={_id}
                                contentId={_id}
                                type={type}
                                title={title}
                                link={link}
                                filePath={filePath}
                                fileName={fileName}
                                fileSize={fileSize}
                                mimeType={mimeType}
                                onDelete={refresh}
                                summary={summary}
                            />
                        ))
                    ) : (
                        // Empty State illustration view
                        <div className="w-full text-center py-16">
                            <p className="text-5xl mb-4">
                                {searchQuery ? "🔍" : "📭"}
                            </p>
                            <p className="text-gray-500 text-lg font-medium">
                                {searchQuery
                                    ? `No results for "${searchQuery}"`
                                    : `No ${activeTab === "all" ? "" : activeTab + " "}content saved yet`
                                }
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                {searchQuery
                                    ? "Try a different search term"
                                    : "Click 'Add Content' to get started"
                                }
                            </p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}