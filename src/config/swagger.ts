import swaggerJSDoc from "swagger-jsdoc"; //Permite una sintaxis especial de un formato llamado YAML nos permite crear la documentación 

const options:swaggerJSDoc.Options={
    swaggerDefinition:{
        openai:'3.0.2',
        tags:[
            {
                name:'Products',
                description:'API operations related to products'
            }
        ],
        info:{
            title:'REST API Node.js /Express / TypeScript',
            version:"1.0.0",
            description:"API Docs for Products"
        }
    },
    apis:['./src/router.ts'] //rutas para comenzar a escribir la documentacion// donde vas a encontrar los endpoints que vas a querer documentar
}

const swaggerSpec=swaggerJSDoc(options)
export default swaggerSpec