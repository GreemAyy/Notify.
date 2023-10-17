import { app, db } from "../..";
import type { ITask } from "./tasks.interface";
import { createTaskQuery } from "./tasks.string";

const createTask=()=>
    app.post('/api/tasks/create',async (req,res)=>{
        const body:ITask = req.body;
        const taskStr = createTaskQuery(body);
        const create = await db.query(taskStr);
        res.send({
            status:create?.error?400:200,
            responseText:create?.error?'error':'created',
            id:create.result?create.result.insertId:null
        })
    })

export const init:Function[] = [createTask] 