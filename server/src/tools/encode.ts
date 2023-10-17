import { createHmac } from "node:crypto";

export const cryptoKey=(key:string)=>{
    let data = key
    for(let i =0;i<10;i++){
        data=createHmac('sha256', data).digest('hex')
    }
    return data
}

export const hashGen=()=>{
    const data='1234567890qwertyuiopasdfghjklzxcvbnm'
    let total = ''
    for(let i = 0;i<25;i++){
        total+=data[Math.floor(Math.random()*(data.length-1))]
    }
    return total
}