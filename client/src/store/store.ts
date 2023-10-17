import { makeAutoObservable } from "mobx"; 
import { getCookiesAll,setCookie } from "../tools/cookie";

const cookies = getCookiesAll();

class User{
    userId:number|null=cookies['id']?+cookies['id']:null
    hash:string|null=cookies['hash']?cookies['hash']:null
    constructor(){
        makeAutoObservable(this)
    }
    setId(id:number){
        setCookie('id',id)
        this.userId=id
    }
    setHash(hash:string){
        setCookie('hash',hash)
        this.hash=hash
    }
}

class TaskEditor{
    isOpen:boolean = false
    constructor(){
        makeAutoObservable(this)
    }
    setIsOpen(){
        this.isOpen=!this.isOpen
        return this.isOpen
    }
}

class Task{
    constructor(){makeAutoObservable(this)}
}

class Interface{
    constructor(){
        makeAutoObservable(this)
    }
    theme:'dark'|'light'=(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light';
    setTheme(theme:'dark'|'light'){
        this.theme=theme
    }
}

export default {
    userStore:new User(),
    interfaceStore:new Interface(),
    taskEditorStore:new TaskEditor()}