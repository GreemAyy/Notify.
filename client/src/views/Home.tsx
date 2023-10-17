import { observer } from "mobx-react-lite"
import Header from "../components/home/header/Header"
import SideBar from "../components/home/sideBar/SideBar"
import s from '../store/store'
import { useEffect, useState } from "react"
import NoAuth from "../components/home/noAuth/NoAuth"
import Tasks from "../components/tasks/Tasks"
import { checkUserHttp } from "../http/auth.http"
import { clearCookiesAll, getCookiesAll } from "../tools/cookie"

export default observer(()=>{
    const userStore = s.userStore
    const [id,setId] = useState<number|null>(userStore.userId);
    const [access,setAccess]=useState(false)
    useEffect(()=>{
        const {userId,hash}=userStore
        if(userId!==null&&hash!==null){
            checkUserHttp(userId,hash)
            .catch(e=>{throw e})
            .then(data=>{
                if(data.status!==200){
                    clearCookiesAll()
                    setAccess(false)
                    window.location.reload()
                }else setAccess(true)
            })
        }
        setInterval(()=>{
            const cookies = getCookiesAll()
            if((+cookies['id']!=userId||cookies['hash']!=hash)&&userId!=null){
                clearCookiesAll()
                window.location.reload()
            }
        },1000)
    },[])
    if(id==null) return <NoAuth/>
    else if (id!=null&&!access) return <>Loading</>
    else return (
        <div className="home">
            <SideBar/>
            <Tasks/>
        </div>
    )
})