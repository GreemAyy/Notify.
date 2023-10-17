import { init } from "./tasks.method";

export default function TasksComponent(){
    init.forEach(f=>f())
}