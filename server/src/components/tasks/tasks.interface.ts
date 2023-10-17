export interface ITask{
    date_from?:Array<string|number>,
    date_to?:Array<string|number>,
    day_from?:number|string,
    month_from?:number|string,
    year_from?:number|string,
    day_to?:number|string,
    month_to?:number|string,
    year_to?:number|string,
    time_from:number|string,
    time_to:number|string,
    task_title:string,
    task_description:string,
    task_creator:number,
    task_group:number,
    task_type:string,
    task_access:string
}