import { init } from "./auth.method";

export default function AuthComponent(){
    init.forEach(f=>f());
}