import sql, { QueryError } from 'mysql2'


export default class database{
    private conn!:sql.Connection
    private config:{ host:string, user:string, password?:string, database:string}    
    constructor(config:{ host:string, user:string, password?:string, database:string,}  
    ){
        this.config=config
        this.conn=sql.createConnection(this.config)
    }
    query(str:string):Promise<{error?:QueryError,result?:any}>{
        return new Promise((s,_)=>{
            this.conn.query(str,(err,result)=>{
                s(err?{error:err}:{result})
            })
        })
    }
}

