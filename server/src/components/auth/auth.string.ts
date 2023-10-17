import type { ILog, ISign } from "./auth.interfaces";

interface ISignQuery extends ISign{ hash:string }

export const signQuery=({name,username,password,hash}:ISignQuery)=>
`INSERT INTO users(id, name,username, password, hash) VALUES (null,'${name}','${username}','${password}','${hash}')`

export const checkUserAlreadyExistsQuery=(username:string)=>
`SELECT id FROM users WHERE username='${username}'`

export const logQuery=({username,password}:ILog)=> 
`SELECT id FROM users WHERE username='${username}' and password='${password}'`

export const setHashQuery=(id:number,hash:string)=>
`UPDATE users SET hash='${hash}' WHERE id=${id}`

export const getHashQuery=(id:number)=>
`select hash from users where id = ${id}`