console.clear()
import HTTP from "./connections/HTTP"
import database from "./connections/DB"
import { DBC } from "./DBC"
import { init } from "./init"

const server = new HTTP()
export const db = new database(DBC)
export const app = server.app
export const http = server.http
server.setPort(Number(process.env.PORT||4000))

init.forEach(async f=>await f())

server.listen()