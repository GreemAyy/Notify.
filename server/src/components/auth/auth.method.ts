import { app, db } from "../..";
import { cryptoKey,hashGen } from "../../tools/encode";
import { checkUserAlreadyExist } from "./auth.functions";
import type { ISign,ILog } from "./auth.interfaces";
import { getHashQuery, logQuery, setHashQuery, signQuery } from "./auth.string";

const sign=()=>
    void app.post('/api/auth/sign',async (req,res)=>{
       const body:ISign&{hash:string} = req.body;
       body.password=cryptoKey(body.password)
       body.hash=hashGen()
       const isExist = await checkUserAlreadyExist(body.username)
       if(!isExist){   
            const create = await db.query(signQuery(body))
                res.send({
                    status:create.error?400:200,
                    responseText:create.error?"error":'created',
                    id:create.error?0:create.result.insertId
                })
            }
       else
            res.send({
                status:400,
                responseText:'already'
            })
    })

const log=()=>
    void app.post('/api/auth/log',async (req,res)=>{
        const body:ILog = req.body;
        body.password=cryptoKey(body.password);
        const check = await db.query(logQuery(body));
        if(check.result.length){
            const id:number = check.result[0]['id'];
            const hash = hashGen();
            const setHash = await db.query(setHashQuery(id,hash));
            res.send({
                status:setHash.error?400:200,
                responseText:setHash.error?"error":'log',
                id:setHash.error?null:id,
                hash:setHash?.error?null:hash
            })
        }else res.send({ status:404, responseText:'not found' });
    })

const checkUser=()=>
    void app.post('/api/auth/check-user',async (req,res)=>{
        const {id,hash}:{id:number,hash:string} = req.body
        const get = await db.query(getHashQuery(id))
        if(get.error)
            res.send({status:400,responseText:'error'})
        else{
            const isEquals = get.result[0]['hash']===hash
            res.send({
                status:!isEquals?400:200,
                responseText:!isEquals?'denied':'accepted'
            })
        }
    })

export const init:Function[]=[sign,log,checkUser]