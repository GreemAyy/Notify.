import '../../../styles/home/SideBar.scss'
import store from '../../../store/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import TaskEditer from './TaskEditer'

export default observer(()=>{
    const interfaceStore = store.interfaceStore
    const taskEditorStore = store.taskEditorStore
    const [isOpen,setIsOpen] = useState(taskEditorStore.isOpen);
    const [pos,setPost]=useState(false)
    useEffect(()=>{
        setPost(s=>!s)
        setTimeout(()=>setIsOpen(taskEditorStore.isOpen),150)
    },[taskEditorStore.isOpen])
    return (
        <div 
        style={{
                top: pos?'50%':0,
                transform:pos?'translate(0,-50%)': 'translate(0,0)',
        }}  
        className='side-bar-block'>
            <div className={"side-bar less-"+interfaceStore.theme}>
                    <div className="side-bar-header">
                        Notify.
                    </div>
                    <div
                    style={{
                        background:isOpen?'white':"var(--primary-color)",
                        color:isOpen?'black':'white'
                    }}
                    onClick={()=>taskEditorStore.setIsOpen()} 
                    className="btn-create-task">
                        <div className="plus-icon">+</div>
                        <span>{isOpen?"Close":"Add task"}</span>
                    </div>
            </div>
            <TaskEditer opacity={isOpen?1:0} display={pos}/>
        </div>
        
    )
})