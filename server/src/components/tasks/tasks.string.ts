import { ITask } from "./tasks.interface";

export const createTaskQuery=(task:ITask)=>
`INSERT INTO tasks (id, day_from, month_from, year_from, day_to, month_to, year_to, time_from, time_to, task_title, task_decription, task_creator, task_group, task_type, task_access) VALUES 
(null,${task.date_from?.[0]},${task.date_from?.[1]},${task.date_from?.[2]},${task.date_to?.[0]},
${task.date_to?.[1]},${task.date_to?.[2]},'${task.time_from}',
'${task.time_to}','${task.task_title}','${task.task_description}',
${task.task_creator},${task.task_group},'${task.task_type}','${task.task_access}')`.split('\n').join('')

