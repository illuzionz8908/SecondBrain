
type items = {
    text: string;
    icon: any;
}

export function SideBaritem(items : items){
    return <div className="flex py-2 cursor-pointer
    hover:bg-gray-200 rounded max-w-48 pl-6 transition-all duration-300">
        <div className="pr-3">
            {items.icon}
        </div>

        <div>
            {items.text}
        </div>
        
    </div>
}