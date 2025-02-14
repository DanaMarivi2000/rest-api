import { Sequelize } from "sequelize";
import dotenv from 'dotenv' //importa la extension
dotenv.config()// manda a llamar las variables de entorno, incluyendo las del archivo
const db=new Sequelize(process.env.DATABASE_URL!,{ //garantiza que el valor estara alli
    dialectOptions:{
        ssl:{
            require:false
        }
    }
})
export default db