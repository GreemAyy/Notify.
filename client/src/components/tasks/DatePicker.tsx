import { useEffect, useState } from "react"
import '../../styles/tasks/DatePicker.scss'

interface IDatePicker{
    date:Date,
    theme?:'dark'|'light',
    OnDateChange(e:Date):void
}

export default ({date,theme='light',OnDateChange}:IDatePicker)=>{
    const months=['January','February','March','April','May','June',
    'July','August','September','October','November','December']
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const getIsLeap=(year:number)=>!!(year%4==0)||false
    const [dayOf,setDayOf]=useState(new Date().getDay());
    const [day,setDay]=useState(new Date().getDate())
    const [month,setMonth]=useState(new Date().getMonth())
    const [year,setYear]=useState(new Date().getFullYear())
    const [isLeap,setIsLeap]=useState(getIsLeap(year))
    const [isOpen,setIsOpen]=useState(false)
  
    const changeDate=(direction:'minus'|'plus')=>{
        if(direction==='minus') {
            if(month!=0) setMonth(m=>m-1);
            else{
                setMonth(11);
                setYear(y=>y-1);
        }}else {
            if(month<11) setMonth(m=>m+1);
            else{
                setMonth(0);
                setYear(y=>y+1);
        }}
    }

    const resolveMonth=(month:number,dir:'plus'|'minus')=>{
        if(dir=='plus')
            return month<11?month+1:0
        else return month<0?month-1:11
    }

    const renderCalendar=()=>{
        const date = new Date()
        date.setFullYear(year);date.setMonth(month);date.setDate(1);
        let dayFrom =date.getDay();date.setDate(0)
        dayFrom=dayFrom==0?6:dayFrom-1;
        let lastDayBefore=date.getDate();date.setMonth(resolveMonth(month,'plus'));date.setDate(0)
        let lastDayOfMonth = date.getDate()
        let dayTo=date.getDay()
        dayTo=dayTo==0?6:dayTo-1
        const total=[];
        for(let i = 0;i<7;i++){
            total.unshift(['prev',lastDayBefore--]);dayFrom--
            if(dayFrom==0) break;
        }
        for(let i = 1;i<=lastDayOfMonth;i++){
            total.push(['in',i])
        };
        for(let i = 1;i<=7;i++){
            total.push(['after',i]);
            if(i+dayTo==6)break;
        }
        const calendar = []
        for (let i = 0; i <total.length; i += 7) {
            calendar.push(total.slice(i, i + 7));
        }
        for(let i = calendar[calendar.length-1].length+1;i<=7;i++){
            calendar[calendar.length-1].push(['after',i])
        }
        return calendar
    }

    return (
        <div className="date-picker-block">
            <div className="date-picker-value">
                {date.toLocaleDateString().split(',')[0]}
            </div>
            <div className="date-picker-calendar is-calendar">
                <div className="date-picker-month is-calendar">
                    <div onClick={_=>changeDate('minus')} className="date-picker-arrow is-calendar">{'<'}</div>
                    <div className="date-picker-month is-calendar">{months[month]}/{year}</div>
                    <div onClick={_=>changeDate('plus')} className="date-picker-arrow is-calendar">{'>'}</div>
                </div>
                <div className="date-picker-days">
                    {days.map(i=>(<div key={i} className="">{i.substring(0,2)}</div>))}
                </div>
                <div className="date-picker-calendar-block">
                    {renderCalendar().map((item,idx)=>(
                        <div key={Math.random()*idx} className="data-picker-calendar-row">
                            {item.map(item2=>(
                                <div
                                style={{opacity:item2[0]!='in'?.5:1}}
                                key={item2[0]+'_'+item2[1]} className="data-picker-calendar-item">
                                    {item2[1]}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}