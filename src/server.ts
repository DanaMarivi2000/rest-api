import express from'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi  from 'swagger-ui-express' //Permite crear la url para acceder a la documentación
import swaggerSpec from './config/swagger'
//isancia de express
const server=express()
//leer daos de formularios
server.use(express.json()) //Permi leer el json //Puedes leer los datos del json
export async function connectDB(){
   try{
       await db.authenticate()
       db.sync() //va agregando nuevos modelos o clumnas a la base de datos, sincroniza en automatico lo que tengamos en nuestros modelos
       console.log(colors.blue.bold('Conexión exitosa'))
   }catch(error){
    console.log(colors.red.bold(error))
   }
}
connectDB()




server.use("/api/products",router)
server.get("/api", (req, res)=>{
    res.json({msg:'Desde API'})
})

//DOCS

server.use('/docs', swaggerUi.serve /* cliente de express */, swaggerUi.setup(swaggerSpec))

export default server
