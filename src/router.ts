import { Router } from "express";
import {body, param} from 'express-validator'
import { getProducts, getProductById, createProduct } from "./handlers/product";
import {handleInputErrors} from './middleware/index'
const router=Router()


router.get("/", getProducts)

router.get('/:id',
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getProductById
)
router.post("/", 
    body("name").notEmpty().withMessage("El nombre del producto no debe estar vacío"),
    body("price").isNumeric().withMessage("Valor no valido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    handleInputErrors, //Funciones intermedias que se ejecutan en cada request de tipo http
    createProduct
)

// router.put("/",(_req,res)=>{
//     res.json("Desde PUT")
// })
// router.patch("/",(_req, res)=>{
//     res.json("desde patch")
// })
// router.delete("/",(_req,res)=>{
//     res.json("desde delete")
// })

export default router