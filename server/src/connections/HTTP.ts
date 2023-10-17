import express ,{Application} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

export default class HTTP{
    app:Application
    private port!:number
    http:http.Server
    constructor(){
        this.app=express()
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.http=http.createServer(this.app)
    }
    setPort(port:number){
        this.port=port
    }
    listen(port:number=Number(process.env.PORT)){
        if(this?.port)
            this.http.listen(this.port)
        else 
            this.http.listen(port)
    }
}

