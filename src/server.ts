import express from'express'
import router from './router'
import db from './config/db'

const server=express()

async function connectDB(){
   try{
       await db.authenticate()
       db.sync() //va agregando nuevos modelos o clumnas a la base de datos
       console.log('Conexión exitosa')
   }catch(error){
    console.log(error)
   }
}
connectDB()




server.use("/api/products",router)


export default server
