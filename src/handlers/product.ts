import { Request, Response, NextFunction } from "express"
import { BeforeDestroy } from "sequelize-typescript"
import Product from "../models/Product.model"

export const getProducts =async (req:Request, res:Response)=>{
    // res.send('Desde get')

    try{
        const products = await Product.findAll({
            order:[ ['id', 'ASC'] ], //Se pueden ordenar los datos
            // limit:2 //Puedes limitar
            attributes:{exclude:['createdAt', 'updatedAt', 'availability']} //Excluye atributos que no quiero traer
        })
        res.json({data:products})
    }catch(error){
        console.log(error)
    }
}

export const getProductById=async(req:Request, res:Response)=>{
    try{
        const {id}=req.params
        console.log(id)
        const productById=await Product.findByPk(id)

        if(!productById){
            res.status(404).json({error:"Producto no encontrado"})
        }
        res.json({data:productById})
    }catch(error){
        console.log(error)
    }
}

export const createProduct=async(req:Request, res:Response, next:NextFunction): Promise<void>=>{
 //check permite validar un campo
 //validationResult resultado de la validacions
 
    // const product=new Product(req.body)//crea el objto
    // const saveProduct=await product.save()//Se almacena en la base de datos
    try{
        const saveProduct=await Product.create(req.body)
        res.json({data:saveProduct})//retorna el json
    }catch(error){
        console.log(error)
    }
    //Ahora en el handler ya solo queda la validación del producto
}