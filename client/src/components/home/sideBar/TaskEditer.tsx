import { observer } from "mobx-react-lite"
import store from "../../../store/store"
import { useEffect, useRef, useState } from "react"
import Calendar from "react-calendar"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { ITask } from "../../../i";
import { taskCreateHttp } from "../../../http/task.http";

interface INewDate{date1:Date,date2:Date,time1:string,time2:string}

export default observer(({display,opacity,date=null}:{display:boolean,opacity:number,date?:INewDate|null})=>{
    const [date1,setDate1]=useState(date!=null?date.date1:new Date())
    const [date2,setDate2]=useState(date!=null?date.date2:new Date())
    const [time1,setTime1]=useState(date!=null?date.time1:'00:00')
    const [time2,setTime2]=useState(date!=null?date.time2:'00:05')
    const title = useRef<HTMLInputElement>(null)
    const desc=useRef<HTMLTextAreaElement>(null)
    const interfaceStore = store.interfaceStore

    const parse = (str:Date)=>str.toLocaleDateString().split(',')[0].split('.')

    const createTask=async()=>{
        const task:ITask={
            date_from:parse(date1),
            date_to:parse(date2),
            time_from:time1,
            time_to:time2,
            task_title:title.current?.value?title.current?.value:'',
            task_description:desc.current?.value?desc.current?.value:'',
            task_creator:store.userStore.userId?store.userStore.userId:0,
            task_group:0,
            task_type:'single',
            task_access:'single'
        };
        const create = await taskCreateHttp(task);    
        console.log(create)  
    }
    return  <div style={{display:display?'block':'none',opacity}}
                className={"task-editor less-"+interfaceStore.theme}>
                <div className="task-editor-title">Title</div>
                <input ref={title} type="text" className="task-editor-input" />
                <div className="task-editor-title">Description</div>
                <textarea ref={desc} className="task-editor-textarea" />
                <div className="task-editor-title">Pick date</div>
                <div className="date">
                    <div className="from-date">
                        <div className="date-title">From</div>
                        <div className="data-time-picker">
                            <DatePicker 
                            dateFormat='dd/MM/yyyy'
                            selected={date1} onChange={d=>setDate1(d!=null?d:new Date())}/>
                            <input value={time1} onChange={e=>setTime1(e.target.value)} type="time" className="task-item" />
                        </div>
                    </div>
                    <div className="to-date">
                        <div className="date-title">To</div>
                        <div className="data-time-picker">
                            <DatePicker 
                            dateFormat='dd/MM/yyyy'
                            selected={date2} 
                            onChange={d=>setDate2(d!=null?d:new Date())}/>
                            <input value={time2} onChange={e=>setTime2(e.target.value)} type="time" className="task-item" />
                        </div>
                    </div>
                </div>
                <div onClick={createTask} className="btn-create-new-task">
                    Create
                </div>
            </div>
})