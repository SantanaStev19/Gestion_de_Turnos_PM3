/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import router from "./router"
import { PostgresError } from "./interfaces/ErrorInterfaces"

const server: Application = express()

server.use(express.json())
server.use(morgan("dev"))
server.use(cors())
server.use(router)
server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    
    const error = err as PostgresError
    if(error.code === 404){
        res.status(404).json({
            message: error.message,
            details: error.detail
        })
    }else{
        res.status(400).json(error.message)
        }
})

export default server