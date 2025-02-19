import { Router } from "express";
import {body, param} from 'express-validator'
import { getProducts, getProductById, createProduct, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import {handleInputErrors} from './middleware/index'
import { IsInt, IsNumeric, NotEmpty } from "sequelize-typescript";
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

router.put("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    body("name").notEmpty().withMessage("El nombre del producto no puede estar vacío"),
    body("price").isNumeric().withMessage("Valor no válido").notEmpty().withMessage("El precio del producto no puede estar vacío").custom(value=>value>0).withMessage("Precio no válido"),
    body("availability").isBoolean().withMessage("Valor para la disponibilidad noválido"),
       handleInputErrors,  //Funciones intermedias que se ejecutan en cada request de tipo http
    updateProduct
)

router.patch("/:id",
    param("id").isInt().withMessage("ID no válido"),  
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",deleteProduct)

export default router