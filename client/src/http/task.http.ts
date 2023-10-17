import ky from "ky";
import { ITask } from "../i";
import { _URL } from "../c";

export const taskCreateHttp=async(task:ITask)=>{
    const req = await ky.post(_URL+'/api/tasks/create', {json:task})
    const data:{status:number,responseText:string,id:number|null} = await req.json()
    return data
}