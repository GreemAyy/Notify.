import { useParams, useRoutes } from "react-router-dom"
import Auth from "../components/auth/Auth"

export default ()=>{
    const {type} = useParams()
    return <Auth type={type!=undefined&&(type=='log'||type=='sign')?type:'error'}/>
}