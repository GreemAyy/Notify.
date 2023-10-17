import {Server} from 'socket.io'
import http from 'http'

export default class socket{
    io:Server
    private http:http.Server
    constructor(http:http.Server,path:string='/'){
        this.http=http
        this.io = new Server(http,{path,cors:{'origin':'*'}})
    }
}