
type items = {
    text: string;
    icon: any;
    isActive: boolean; //to check which tab is Active
    onClick: () => void; //to handle click of Tabs
}

export function SideBaritem(items : items){
    return <div 
              onClick={items.onClick}
              className={`flex py-2 cursor-pointer
            hover:bg-gray-200 rounded max-w-48 pl-6 transition-all duration-300
              ${items.isActive ? "bg-purple-100 text-purple-600" : ""}`}>

            <div className="pr-3">
                {items.icon}
            </div>

            <div>
                {items.text}
            </div>
        
    </div>
}