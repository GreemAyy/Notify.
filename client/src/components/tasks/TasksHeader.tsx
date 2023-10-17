import { observer } from "mobx-react-lite";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import DatePicker from "./DatePicker";

export default observer(()=>{
    
    const [date,setDate] = useState(new Date())

    return (
    <div className="task-header">
        <div className="left-date date-arrow">{'<'}</div>
        <DatePicker date={date} OnDateChange={e=>console.log(e)}/>
        <div className="right-date date-arrow">{'>'}</div>
    </div>)
})