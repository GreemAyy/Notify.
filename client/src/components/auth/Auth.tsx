import { useEffect, useRef, useState } from 'react'
import '../../styles/auth/auth.scss'
import { Link, useNavigate} from 'react-router-dom'
import { LogHttp, SignHttp } from '../../http/auth.http'
import store from '../../store/store'

enum Status{default,loading,done,error}

export default ({type}:{type:string})=>{
    const doFirstUpper=(str:string)=>str.substring(0,1).toUpperCase()+str.substring(1,str.length)
    const nav = useNavigate()
    const userStore = store.userStore;
    const [showErrors,setShowErrors]=useState(false);
    const [errorsList,setErrorsList]=useState<string[]>([])
    const [status,setStatus] = useState<Status>(Status.default)
    const nameRef = useRef<HTMLInputElement|null>(null)
    const usernameRef=useRef<HTMLInputElement|null>(null)
    const passwordRef = useRef<HTMLInputElement|null>(null)

    useEffect(()=>{ if(type=='error'||userStore.userId!=null)nav('/') },[])
    const auth=async()=>{
        const name = type=='sign'&&nameRef.current?nameRef.current?.value:'00' 
        const username = usernameRef.current?.value||'00'
        const password = passwordRef.current?.value||'00'
        const can = validate({name,username,password}) 
        if(can){
            setStatus(Status.loading)
            const req = await (type=='sign'?SignHttp({name,username,password}):LogHttp({username,password}))
            if(req.status==200){
                setStatus(Status.done)
                userStore.setId(req.id)
                userStore.setHash(req.hash)
                setTimeout(()=>{
                    setStatus(Status.default)
                    nav(type=='sign'?'/auth/log':'/')
                },3000)
            }
            else setStatus(Status.error)
        }
    }

    const validate=({name,username,password}:{[key:string]:string|undefined})=>{
        const errors = []
        if(name!.length<2||name!.length>50)
            errors.push('Name length less 2 and more 50')
        if(username!.length<6||username!.length>50)
            errors.push("Username length less 6 and more 50")
        if(password!.length<6||password!.length>50)
            errors.push("Password length less 6 and more 50")
        setErrorsList(errors)
        setShowErrors(!!errors.length)
        return !errors.length
    }

    const setBG=(status:Status)=>{
        if(status==Status.default)
            return 'rgb(0, 120, 255)'
        else if(status==Status.loading)
            return 'darkgray'
        else if(status==Status.done)
            return 'yellowgreen'
        else return 'red'
    }

    return (
        <div className="log-reg-block">
            <div className="log-reg-header">
                {doFirstUpper(type)} in
            </div>
            {   type=='sign'?
                <>
                    <div className="log-reg-header-text">Name</div>
                    <input ref={nameRef}  type="text" className="log-reg-header-input" />
                </>:""
            }
            <div className="log-reg-header-text">Username</div>
            <input ref={usernameRef} type="text" className="log-reg-header-input" />
            <div className="log-reg-header-text">Password</div>
            <input ref={passwordRef} type="password" className="log-reg-header-input" />
            <div className='log-reg-in' onClick={()=>nav(`/auth/${type=="sign"?'log':'sign'}`)}>
                {type=='log'?"Don't have account? Reg now":'Already have account? Log now'}
            </div>
            <div onClick={auth} style={{
                color:'white',backgroundColor:setBG(status)
            }} className="btn-log-reg">
                {
                    status==Status.default?
                    doFirstUpper(type)+' in':
                    status==Status.loading?
                    'Loading...':
                    status==Status.done?
                    'Done! Wait 3s.':
                    "Error"
                }
            </div>
            {showErrors?
                <div className="errors-list">
                    {
                        errorsList.map(item=>(
                            <div key={item} className="error-item">
                                *{item}
                            </div>
                        ))
                    }
                </div>:''    
            }
        </div>
    )
}