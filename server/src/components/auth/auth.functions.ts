import { db } from "../.."
import { checkUserAlreadyExistsQuery } from "./auth.string"

export const checkUserAlreadyExist=async(username:string)=>{
    const check = await db.query(checkUserAlreadyExistsQuery(username))
    return check.error?true:check.result.length?true:false
}