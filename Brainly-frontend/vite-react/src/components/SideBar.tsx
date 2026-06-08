
import { BrainIcon } from "../icons/BrainIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { TagIcon } from "../icons/TagIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SideBaritem } from "./SideBarItem";


export function Sidebar(){
    return <div className="h-screen w-72 bg-white fixed border-r left-0 top-0 pl-6">

        <div className="flex text-2xl pt-4 items-center">
            <div className="pr-2 text-purple-600">
                <BrainIcon/>
            </div>
            Second Brain
        </div>

        <div className="pt-7 pl-4">
            <SideBaritem text="Twitter" icon={<TwitterIcon/>}/>
            <SideBaritem text="Youtube" icon={<YoutubeIcon/>}/>
            <SideBaritem text="Documents" icon={<DocumentIcon/>}/>
            <SideBaritem text="Links" icon={<LinkIcon/>}/>
            <SideBaritem text="Tags" icon={<TagIcon/>}/>
        </div>
    </div>
}