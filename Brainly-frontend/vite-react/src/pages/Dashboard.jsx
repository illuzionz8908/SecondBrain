
import { useEffect, useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { ShareIcon } from '../icons/ShareIcon'
import { PlusIcon } from '../icons/PlusIcon'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/SideBar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  //to track active tab
  const [activeTab, setActivTab] = useState("all");

  useEffect(() =>{
    refresh()
  },[modalOpen])


  //filter contents based on Active Tab
  const filteredContents = activeTab == "all" ? contents : contents.filter((content) => content.type == activeTab)

  return (<div>

    <Sidebar
        activeTab={activeTab}
        onTabChange={setActivTab}/>

    <div className="p-4 ml-72 bg-gray-200 min-h-screen">

        <CreateContentModal 
            open={modalOpen} 
            onClose ={ () => { setModalOpen(false)}}
        />

        <div className='flex justify-end gap-4'>

          <Button 
              onClick = {() => setModalOpen(true)} 
              startIcon = {<PlusIcon size="md"/>}  
              variant="primary" 
              text="Add Content" 
              size="sm">
          </Button>

          <Button 
              startIcon = {<ShareIcon size="md"/>} 
              variant="secondary" 
              text="Share" 
              size="md">
          </Button>

        </div>


         {/* Show which tab is selected */}
        <h2 className="text-xl font-bold mt-4 capitalize">
            {activeTab === "all" ? "All Saved Contents" : `${activeTab} Saved Contents`}
        </h2>

        <div className='flex pt-4 gap-4 flex-wrap'>

            {filteredContents.length > 0 ? (
              filteredContents.map(({_id, title, type, link, filePath, fileName, fileSize, mimeType}) => (
                <Card
                  key={_id}
                  type={type}
                  title={title}
                  link={link}
                  filePath={filePath}
                  fileName={fileName}
                  fileSize={fileSize}
                  mimeType={mimeType}
                />
              ))
            ) : (
              <p className='text-gray-500'>
                No {activeTab} Content saved yet
              </p>
            )}

        </div>

    </div>
  </div>)
}

