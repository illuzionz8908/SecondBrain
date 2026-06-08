
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
  const {contents,refresh} = useContent();

  useEffect(() =>{
    refresh()
  },[modalOpen])

  return (<div>

    <Sidebar/>

    <div className="p-4 ml-72 bg-gray-200 min-h-screen">

        <CreateContentModal open={modalOpen} onClose ={ () => {
          setModalOpen(false)
        }}/>

        <div className='flex justify-end gap-4'>

          <Button onClick = {() => setModalOpen(true)} startIcon = {<PlusIcon size="md"/>}  variant="primary" text="Add Content" size="sm"></Button>
          <Button startIcon = {<ShareIcon size="md"/>} variant="secondary" text="Share" size="md"></Button>

        </div>

        <div className='flex pt-4 gap-4 flex-wrap'>

          {contents.map(({title,type,link}) => <Card 
            type={type} 
            link={link}
            title={title}/>)}

        </div>

    </div>
  </div>)
}

