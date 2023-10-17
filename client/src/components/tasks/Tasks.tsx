import { observer } from "mobx-react-lite";
import TasksHeader from "./TasksHeader";
import TasksBody from "./TasksBody";
import '../../styles/tasks/Tasks.scss'
import store from "../../store/store";

export default observer(()=>{
    const interfaceTheme = store.interfaceStore
    
    return (
    <div className={"task-block less-"+interfaceTheme.theme}>
        <TasksHeader/>
        <TasksBody/>
    </div>)
})