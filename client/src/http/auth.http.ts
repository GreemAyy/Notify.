import ky from "ky"
import { _URL } from "../c"

interface ILog{username:string,password:string};
interface ISign extends ILog {name:string}
interface IReturn{id:number,hash:string,status:number,responseText:string}

export const LogHttp=async ({username,password}:ILog):Promise<IReturn>=>{
    const req = await ky.post(_URL+'/api/auth/log',{json:{username,password}})
    return await req.json()
}

export const SignHttp=async ({username,password,name}:ISign):Promise<IReturn>=>{
    const req = await ky.post(_URL+'/api/auth/sign',{json:{name,username,password}})
    return await req.json()
}

export const checkUserHttp=async(id:number,hash:string)
:Promise<{status:number,responseText:string}>=>{
    const req = await ky.post(_URL+'/api/auth/check-user',{json:{id,hash}})
    return await req.json()
}