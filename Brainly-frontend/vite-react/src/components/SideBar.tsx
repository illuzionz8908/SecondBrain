
import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBaritem } from "./SideBarItem";


//to check for active tabs
interface SideBarProps {
    activeTab: String;
    onTabChange: (tab : string) => void;
}

export function Sidebar({activeTab, onTabChange} : SideBarProps){
    return <div className="h-screen w-72 bg-white fixed border-r left-0 top-0 pl-6">

        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
                <BrainIcon/>
            </div>
            Second Brain
        </div>

        <div className="pt-7 pl-4">

            <SideBaritem 
                text="All" 
                icon={<LinkIcon size="lg"/>}
                isActive = {activeTab == "All"}
                onClick={() => onTabChange("all")}
            />

            <SideBaritem 
                text="Twitter" 
                icon={<TwitterIcon/>}
                isActive = {activeTab == "twitter"}
                onClick={() => onTabChange("twitter")}
            />

            <SideBaritem 
                text="Youtube" 
                icon={<YoutubeIcon/>}
                isActive = {activeTab == "youtube"}
                onClick={() => onTabChange("youtube")}
            />

            <SideBaritem 
                text="Documents" 
                icon={<DocumentIcon/>}
                isActive = {activeTab == "documents"}
                onClick={() => onTabChange("documents")}
            />

            <SideBaritem 
                text="Tags" 
                icon={<TagIcon size="lg"/>}
                isActive = {activeTab == "tags"}
                onClick={() => onTabChange("tags")}
            />

        </div>
    </div>
}